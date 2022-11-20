import { DelCoordinatorInputSchema, CoordinatorInputSchema, UpdateCoordinatorInputSchema } from "../../../joi/coordinator.joi";
import { DeletedCoordinator, MutationResolvers, ReturnRegisteredCoordinator } from "../../generated";
import { signAccessJWToken, signRefreshJWToken } from "../../../utils/jwt.util";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { decryptToken, encryptToken } from "../../../utils/crypto.utils";
import { hashPassword } from "../../../utils/hashedPwd.util";
import getUser from "../../../utils/getuser.util";
import { v4 as uuid } from "uuid";

const coordinatorMutations: MutationResolvers = {
  // CREATE COORDINATOR USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  coordinator: async (_, { registerInput: input }, { prisma }) => {
    const { department, institute, email } = input;
    // Validate Input field
    const validate = CoordinatorInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Check if Email Already Exist
    const coordinatorExist = await prisma.coordinator.findUnique({
      where: { email },
    });

    if (coordinatorExist)
      throw new AuthenticationError("Coordinator already existed!");

    // Validate only a coordinator exist in dept of a school
    const onlyCoordExist = await prisma.coordinator.findFirst({
      where: { AND: [{ department }, { institute }] },
    });

    if (onlyCoordExist)
      throw new AuthenticationError(
        "Coordinator in this department of this school already existed!"
      );

    // Hashed and Replaced Password Input
    const hashPwd = await hashPassword(input.password);
    input.password = hashPwd;

    // Create New Coordinator User
    const coordinatorData = {
      ...input,
      id: uuid(),
    };

    const newCoordinator = await prisma.coordinator.create({
      data: coordinatorData,
    });

    // Remove the password field for security reasons
    Reflect.deleteProperty(newCoordinator, "password");

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      id: newCoordinator.id,
      email: newCoordinator.email,
      role: newCoordinator.user,
    });

    const refreshToken = await signRefreshJWToken({
      id: newCoordinator.id,
      email: newCoordinator.email,
      role: newCoordinator.user,
    });

    const encryptAccessToken = encryptToken(accessToken);
    const encryptRefreshToken = encryptToken(refreshToken);

    return {
      status: 201,
      message: "Created coordinator successfully!",
      accessToken: encryptAccessToken,
      refreshToken: encryptRefreshToken,
      coordinator: newCoordinator,
    } as ReturnRegisteredCoordinator;
  },

  // UPDATE COORDINATOR USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  updateCoordinator: async (_, { updateInput: input }, { prisma, auth }) => {
    const token = decryptToken(auth) as string;
    const user = getUser(token);
    const { email: loginUserEmail, role } = user;

    // Authenticate user
    if (!user || loginUserEmail === '' || role === '')
      throw new AuthenticationError("User not authenticated!");

    // Authorize the user to be either a Coordinator or an Admin
    if (role !== 'Coordinator' && role !== 'Admin')
      throw new AuthenticationError("Not authorized!");

    const { title, firstName, lastName, phone, gender, avatar, email } = input;

    // Validate Input field
    const validate = UpdateCoordinatorInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Check if Email Already Exist
    const coordinatorExist = await prisma.coordinator.findUnique({
      where: { email },
    });

    if (!coordinatorExist) {
      throw new AuthenticationError("Coordinator doesn't exist!");
    }

    // Authorized Genuine Login User
    if (loginUserEmail !== email) {
      throw new AuthenticationError("Not authorized: not a genuine user!");
    }

    // Update Coordinator User
    const updateCoordinatorData = {
      title,
      firstName,
      lastName,
      phone,
      gender,
      avatar,
    };

    const updatedCoordinator = await prisma.coordinator.update({
      where: { email: loginUserEmail },
      data: updateCoordinatorData,
    });

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      id: updatedCoordinator.id,
      email: updatedCoordinator.email,
      role: updatedCoordinator.user,
    });

    const refreshToken = await signRefreshJWToken({
      id: updatedCoordinator.id,
      email: updatedCoordinator.email,
      role: updatedCoordinator.user,
    });

    const encryptAccessToken = encryptToken(accessToken);
    const encryptRefreshToken = encryptToken(refreshToken);

    return {
      status: 201,
      message: "Updated coordinator successfully!",
      accessToken: encryptAccessToken,
      refreshToken: encryptRefreshToken,
      coordinator: updatedCoordinator,
    } as ReturnRegisteredCoordinator;
  },

  // DElETE COORDINATOR USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  deleteCoordinator: async (_, { emailInput }, { prisma, auth }) => {
    const token = decryptToken(auth) as string;
    const user = getUser(token);
    const { email: loginUserEmail, role } = user;

    // Authenticate user
    if (!user || loginUserEmail === '' || role === '')
      throw new AuthenticationError("User not authenticated!");

    // Authorize the user to be either a Coordinator or an Admin
    if (role !== 'Coordinator' && role !== 'Admin')
      throw new AuthenticationError("Not authorized!");
    const { email } = emailInput;

    // Validate Input field
    const validate = DelCoordinatorInputSchema.validate(emailInput);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Error! Invalid coordinator ID!"
      );

    // Check if Coordinator Already Exist
    const coordinatorExist = await prisma.coordinator.findUnique({
      where: { email },
    });

    if (!coordinatorExist) {
      throw new AuthenticationError("Coordinator doesn't exist!");
    }

    // Authorized Genuine Login User
    if (loginUserEmail !== email) {
      throw new AuthenticationError("Not authorized: not a genuine user!");
    }

    // Delete Coordinator
    const deletedCoordinator = await prisma.coordinator.delete({
      where: { email: loginUserEmail },
    });
    const { id: deletedId, firstName, lastName, staffID } = deletedCoordinator;

    return {
      status: 200,
      message: "Deleted coordinator successfully!",
      id: deletedId,
      firstName,
      lastName,
      staffID,
    } as DeletedCoordinator;
  },
};

export default coordinatorMutations;
