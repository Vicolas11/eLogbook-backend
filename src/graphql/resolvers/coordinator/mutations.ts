import { DelCoordinatorInputSchema, CoordinatorInputSchema, UpdateCoordinatorInputSchema } from "../../../joi/coordinator.joi";
import { DeletedCoordinator, MutationResolvers, ReturnRegisteredCoordinator } from "../../generated";
import { signAccessJWToken, signRefreshJWToken } from "../../../utils/jwt.util";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { hashPassword } from "../../../utils/hashedPwd.util";
import { v4 as uuid } from "uuid";

const coordinatorMutations: MutationResolvers = {
  // CREATE COORDINATOR USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  coordinator: async (_, { registerInput: input }, { prisma }) => {
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
      where: { email: input.email },
    });

    if (coordinatorExist)
      throw new AuthenticationError("Coordinator already existed!");

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
      coordinatorID: newCoordinator?.id,
    });
    const refreshToken = await signRefreshJWToken({
      coordinatorID: newCoordinator?.id,
    });

    return {
      status: 201,
      message: "Created coordinator successfully!",
      accessToken,
      refreshToken,
      coordinator: newCoordinator,
    } as ReturnRegisteredCoordinator;
  },

  // UPDATE COORDINATOR USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  updateCoordinator: async (_, { updateInput: input }, { prisma }) => {
    const { email, firstName, lastName, phone, gender, avatar } = input;

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
      where: { email: email },
    });
    if (!coordinatorExist) {
      throw new AuthenticationError("Coordinator doesn't exist!");
    }

    // Update Coordinator User
    const updateCoordinatorData = {
      firstName,
      lastName,
      phone,
      gender,
      avatar,
    };

    const updatedCoordinator = await prisma.coordinator.update({
      where: { email: email },
      data: updateCoordinatorData,
    });

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      coordinatorID: updatedCoordinator.id,
    });
    const refreshToken = await signRefreshJWToken({
      coordinatorID: updatedCoordinator.id,
    });

    return {
      status: 201,
      message: "Updated coordinator successfully!",
      accessToken,
      refreshToken,
      coordinator: updatedCoordinator,
    } as ReturnRegisteredCoordinator;
  },

  // DElETE COORDINATOR USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  deleteCoordinator: async (_, { emailInput }, { prisma }) => {
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
      where: { email: email },
    });
    if (!coordinatorExist) {
      throw new AuthenticationError("Coordinator doesn't exist!");
    }

    // Delete Coordinator
    const deletedCoordinator = await prisma.coordinator.delete({
      where: { email: email },
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
