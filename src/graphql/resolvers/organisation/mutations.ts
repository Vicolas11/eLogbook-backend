import { DeleteOrganisationInputSchema, RegisterOrganisationInputSchema, UpdateOrganisationInputSchema } from "../../../joi/organisation.joi";
import { DeletedOrganisation, MutationResolvers, ReturnRegisteredOrganisation } from "../../generated";
import { signAccessJWToken, signRefreshJWToken } from "../../../utils/jwt.util";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { hashPassword } from "../../../utils/hashedPwd.util";
import { v4 as uuid } from "uuid";

const organisationMutations: MutationResolvers = {

  // CREATE ORGANISATION USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  organisation: async (_, { registerInput: input }, { prisma }) => {
    // Validate Input field
    const validate = RegisterOrganisationInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Check if Email Already Exist
    const organisationExist = await prisma.organisation.findUnique({
      where: { email: input.email },
    });

    if (organisationExist)
      throw new AuthenticationError("Organisation already existed!");

    // Hashed and Replaced Password Input
    const hashPwd = await hashPassword(input.password);
    input.password = hashPwd;

    // Create New Organisation User
    const organisationData = {
      ...input,
      id: uuid(),
    };
    const newOrganisation = await prisma.organisation.create({
      data: organisationData,
    });

    // Remove the password field for security reasons
    Reflect.deleteProperty(newOrganisation, "password");

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      organisationID: newOrganisation?.id,
    });
    const refreshToken = await signRefreshJWToken({
      organisationID: newOrganisation?.id,
    });

    return {
      status: 201,
      message: "Created organisation successfully!",
      accessToken,
      refreshToken,
      organisation: newOrganisation,
    } as ReturnRegisteredOrganisation;
  },

  // UPDATE ORGANISATION USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  updateOrganisation: async (_, { updateInput: input }, { prisma }) => {
    const { email, name, sector, phone, address, employees, logo } = input;

    // Validate Input field
    const validate = UpdateOrganisationInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Check if Email Already Exist
    const organisationExist = await prisma.organisation.findUnique({
      where: { email: email },
    });
    if (!organisationExist) {
      throw new AuthenticationError("Organisation doesn't exist!");
    }

    // Update Organisation User
    const updateOrganisationData = {
      name,
      sector,
      phone,
      address,
      employees,
      logo,
    };

    const updatedOrganisation = await prisma.organisation.update({
      where: { email: email },
      data: updateOrganisationData,
    });

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      organisationID: updatedOrganisation.id,
    });
    const refreshToken = await signRefreshJWToken({
      organisationID: updatedOrganisation.id,
    });

    return {
      status: 201,
      message: "Updated organisation successfully!",
      accessToken,
      refreshToken,
      organisation: updatedOrganisation,
    } as ReturnRegisteredOrganisation;
  },

  // DElETE ORGANISATION USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  deleteOrganisation: async (_, { emailInput }, { prisma }) => {
    const { email } = emailInput;

    // Validate Input field
    const validate = DeleteOrganisationInputSchema.validate(emailInput);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Error! Invalid organisation ID!"
      );

    // Check if Organisation Already Exist
    const organisationExist = await prisma.organisation.findUnique({
      where: { email: email },
    });
    if (!organisationExist) {
      throw new AuthenticationError("Organisation doesn't exist!");
    }

    // Delete Organisation
    const deletedOrganisation = await prisma.organisation.delete({
      where: { email: email },
    });

    const { id: delId, name, sector, email: delEmail } = deletedOrganisation;

    return {
      status: 200,
      message: "Deleted organisation successfully!",
      id: delId,
      name,
      sector,
      email: delEmail,
    } as DeletedOrganisation;
  },
};

export default organisationMutations;
