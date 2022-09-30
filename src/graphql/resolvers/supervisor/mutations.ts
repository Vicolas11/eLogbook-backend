import { DeleteSupervisorInputSchema, RegisterSupervisorInputSchema, UpdateSupervisorInputSchema } from "../../../joi/supervisor.joi";
import { DeletedSupervisor, MutationResolvers, ReturnRegisteredSupervisor } from "../../generated";
import { signAccessJWToken, signRefreshJWToken } from "../../../utils/jwt.util";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { hashPassword } from "../../../utils/hashedPwd.util";
import { v4 as uuid } from "uuid";

const supervisorMutations: MutationResolvers = {
  // CREATE SUPERVISOR USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  supervisor: async (_, { registerInput: input }, { prisma }) => {
    // Validate Input field
    const validate = RegisterSupervisorInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Check if Email Already Exist
    const supervisorExist = await prisma.supervisor.findUnique({
      where: { email: input.email },
    });

    if (supervisorExist)
      throw new AuthenticationError("Supervisor already existed!");

    // Hashed and Replaced Password Input
    const hashPwd = await hashPassword(input.password);
    input.password = hashPwd;

    // Create New Supervisor User
    const supervisorData = {
      ...input,
      id: uuid(),
    };
    const newSupervisor = await prisma.supervisor.create({
      data: supervisorData,
    });

    // Remove the password field for security reasons
    Reflect.deleteProperty(newSupervisor, "password");

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      supervisorID: newSupervisor?.id,
    });
    const refreshToken = await signRefreshJWToken({
      supervisorID: newSupervisor?.id,
    });

    return {
      status: 201,
      message: "Created supervisor successfully!",
      accessToken,
      refreshToken,
      supervisor: newSupervisor,
    } as ReturnRegisteredSupervisor;
  },

  // UPDATE SUPERVISOR USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  updateSupervisor: async (_, { updateInput: input }, { prisma }) => {
    const { email, firstName, lastName, phone, gender, avatar } = input;

    // Validate Input field
    const validate = UpdateSupervisorInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Check if Email Already Exist
    const supervisorExist = await prisma.supervisor.findUnique({
      where: { email: email },
    });
    if (!supervisorExist) {
      throw new AuthenticationError("Supervisor doesn't exist!");
    }

    // Update Supervisor User
    const updateSupervisorData = {
      firstName,
      lastName,
      phone,
      gender,
      avatar,
    };

    const updatedSupervisor = await prisma.supervisor.update({
      where: { email: email },
      data: updateSupervisorData,
    });

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      supervisorID: updatedSupervisor.id,
    });
    const refreshToken = await signRefreshJWToken({
      supervisorID: updatedSupervisor.id,
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
  deleteSupervisor: async (_, { emailInput }, { prisma }) => {
    const { email } = emailInput;

    // Validate Input field
    const validate = DeleteSupervisorInputSchema.validate(emailInput);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Error! Invalid supervisor ID!"
      );

    // Check if Supervisor Already Exist
    const supervisorExist = await prisma.supervisor.findUnique({
      where: { email: email },
    });
    if (!supervisorExist) {
      throw new AuthenticationError("Supervisor doesn't exist!");
    }

    // Delete Supervisor
    const deletedSupervisor = await prisma.supervisor.delete({
      where: { email: email },
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
