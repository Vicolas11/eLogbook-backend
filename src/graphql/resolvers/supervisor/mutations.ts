import { DelSupervisorInputSchema, SupervisorInputSchema, UpdateSupervisorInputSchema } from "../../../joi/supervisor.joi";
import { DeletedSupervisor, MutationResolvers, ReturnRegisteredSupervisor } from "../../generated";
import { signAccessJWToken, signRefreshJWToken } from "../../../utils/jwt.util";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { decryptToken, encryptToken } from "../../../utils/crypto.utils";
import { hashPassword } from "../../../utils/hashedPwd.util";
import titleCase from "../../../utils/titlecase.utl";
import getUser from "../../../utils/getuser.util";
import { v4 as uuid } from "uuid";

const supervisorMutations: MutationResolvers = {
  // CREATE SUPERVISOR USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  supervisor: async (_, { registerInput: input }, { prisma }) => {
    const { email, institute, department, firstName, lastName, staffID } = input;
    
    // Validate Input field
    const validate = SupervisorInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Check if Email Already Exist
    const supervisorExist = await prisma.supervisor.findUnique({
      where: { email },
    });

    if (supervisorExist)
      throw new AuthenticationError("Supervisor already existed!");

    // Get the Coordinator in a department of a school
    const coordinator = await prisma.coordinator.findFirst({
      where: {
        AND: [{ institute }, { department }],
      },
    });

    if (!coordinator)
      throw new AuthenticationError(
        "Sorry, coordinator for this department doesn't exist!"
      );

    const cooordinatorId = coordinator?.id;

    // Hashed and Replaced Password Input
    const hashPwd = await hashPassword(input.password);
    input.password = hashPwd;
    input.firstName = titleCase(firstName);
    input.lastName = titleCase(lastName);
    input.staffID = staffID.toUpperCase();
    input.institute = titleCase(institute);
    input.department = titleCase(department);
    input.email = email.toLowerCase();

    // Create New Supervisor User
    const supervisorData = {
      ...input,
      id: uuid(),
    };
    
    const newSupervisor = await prisma.supervisor.create({
      data: {
        ...supervisorData,
        coordinator: {
          connect: {
            id: cooordinatorId,
          },
        },
      },
    });

    // Remove the password field for security reasons
    Reflect.deleteProperty(newSupervisor, "password");

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      id: newSupervisor.id,
      email: newSupervisor.email,
      role: newSupervisor.user,
    });

    const refreshToken = await signRefreshJWToken({
      id: newSupervisor.id,
      email: newSupervisor.email,
      role: newSupervisor.user,
    });

    const encryptAccessToken = encryptToken(accessToken);
    const encryptRefreshToken = encryptToken(refreshToken);

    return {
      status: 201,
      message: "Created supervisor successfully!",
      accessToken: encryptAccessToken,
      refreshToken: encryptRefreshToken,
      supervisor: newSupervisor,
    } as ReturnRegisteredSupervisor;
  },

  // UPDATE SUPERVISOR USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  updateSupervisor: async (_, { updateInput: input }, { prisma, auth }) => {
    const token = decryptToken(auth) as string;
    const user = getUser(token);
    const { email: loginUserEmail, role } = user;

    // Authenticate user
    if (!user || loginUserEmail === '' || role === '')
      throw new AuthenticationError("User not authenticated!");

    // Authorize the user to be either a Supervisor or an Admin
    if (role !== 'Supervisor' && role !== 'Admin')
      throw new AuthenticationError("Not authorized!");

    const { title, email, firstName, lastName, phone, gender, avatar } = input;

    // Validate Input field
    const validate = UpdateSupervisorInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Check if Supervisor Already Exist
    const supervisorExist = await prisma.supervisor.findUnique({
      where: { email },
    });

    if (!supervisorExist)
      throw new AuthenticationError("Supervisor doesn't exist!");

    // Authorized Genuine Login User
    if (loginUserEmail !== email)
      throw new AuthenticationError("Not authorized: not a genuine user!");

    // Ensure field is in Title Case
    input.firstName = titleCase(firstName);
    input.lastName = titleCase(lastName);

    // Update Supervisor User
    const data = {
      title,
      firstName,
      lastName,
      phone,
      gender,
      avatar,
    };

    const updatedSupervisor = await prisma.supervisor.update({
      where: { email: loginUserEmail },
      data,
    });

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      id: updatedSupervisor.id,
      email: updatedSupervisor.email,
      role: updatedSupervisor.user,
    });

    const refreshToken = await signRefreshJWToken({
      id: updatedSupervisor.id,
      email: updatedSupervisor.email,
      role: updatedSupervisor.user,
    });

    return {
      status: 201,
      message: "Updated supervisor successfully!",
      accessToken,
      refreshToken,
      supervisor: updatedSupervisor,
    } as ReturnRegisteredSupervisor;
  },

  // DElETE SUPERVISOR USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  deleteSupervisor: async (_, { emailInput }, { prisma, auth }) => {
    const token = decryptToken(auth) as string;
    const user = getUser(token);
    const { email: loginUserEmail, role } = user;

    // Authenticate user
    if (!user || loginUserEmail === '' || role === '')
      throw new AuthenticationError("User not authenticated!");

    // Authorize the user to be either a Supervisor or an Admin
    if (role !== 'Supervisor' && role !== 'Admin')
      throw new AuthenticationError("Not authorized!");

    const { email } = emailInput;

    // Validate Input field
    const validate = DelSupervisorInputSchema.validate(emailInput);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Error! Invalid supervisor ID!"
      );

    // Check if Supervisor Already Exist
    const supervisorExist = await prisma.supervisor.findUnique({
      where: { email },
    });

    if (!supervisorExist) {
      throw new AuthenticationError("Supervisor doesn't exist!");
    }

    // Authorized Genuine Login User
    if (loginUserEmail !== email) {
      throw new AuthenticationError("Not authorized: not a genuine user!");
    }

    // Delete Supervisor
    const deletedSupervisor = await prisma.supervisor.delete({
      where: { email: loginUserEmail },
    });

    const { id: deletedId, firstName, lastName, staffID } = deletedSupervisor;

    return {
      status: 200,
      message: "Deleted supervisor successfully!",
      id: deletedId,
      firstName,
      lastName,
      staffID,
    } as DeletedSupervisor;
  },
};

export default supervisorMutations;
