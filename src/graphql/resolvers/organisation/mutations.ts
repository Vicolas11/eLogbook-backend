import { DelOrganisationInputSchema, OrganisationInputSchema, UpdateOrganisationInputSchema } from "../../../joi/organisation.joi";
import { DeletedOrganisation, MutationResolvers, ReturnRegisteredOrganisation } from "../../generated";
import { signAccessJWToken, signRefreshJWToken } from "../../../utils/jwt.util";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { decryptToken, encryptToken } from "../../../utils/crypto.utils";
import { hashPassword } from "../../../utils/hashedPwd.util";
import getUser from "../../../utils/getuser.util";
import { v4 as uuid } from "uuid";

const organisationMutations: MutationResolvers = {
  // CREATE ORGANISATION USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  organisation: async (_, { registerInput: input }, { prisma }) => {
    // Validate Input field
    const validate = OrganisationInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );
    
    const { email } = input;

    // Check if Email Already Exist
    const organisationExist = await prisma.organisation.findUnique({
      where: { email },
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
      id: newOrganisation.id,
      email: newOrganisation.email,
      role: newOrganisation.user,
    });

    const refreshToken = await signRefreshJWToken({
      id: newOrganisation.id,
      email: newOrganisation.email,
      role: newOrganisation.user,
    });

    const encryptAccessToken = encryptToken(accessToken);
    const encryptRefreshToken = encryptToken(refreshToken);

    return {
      status: 201,
      message: "Created organisation successfully!",
      accessToken: encryptAccessToken,
      refreshToken: encryptRefreshToken,
      organisation: newOrganisation,
    } as ReturnRegisteredOrganisation;
  },

  // UPDATE ORGANISATION USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  updateOrganisation: async (_, { updateInput: input }, { prisma, auth }) => {
    const token = decryptToken(auth) as string;
    const user = getUser(token);
    const { email: loginUserEmail, role } = user;

    // Authenticate user
    if (!user || loginUserEmail === '' || role === '')
      throw new AuthenticationError("User not authenticated!");

    // Authorize the user to be either a Organisation or an Admin
    if (role !== 'Organisation' && role !== 'Admin')
      throw new AuthenticationError("Not authorized!");

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
      where: { email },
    });

    if (!organisationExist)
      throw new AuthenticationError("Organisation doesn't exist!");    

    // Authorized Genuine Login User
    if (loginUserEmail !== email)
      throw new AuthenticationError("Not authorized: not a genuine user!");

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
      where: { email: loginUserEmail },
      data: updateOrganisationData,
    });

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      id: updatedOrganisation.id,
      email: updatedOrganisation.email,
      role: updatedOrganisation.user,
    });
    
    const refreshToken = await signRefreshJWToken({
      id: updatedOrganisation.id,
      email: updatedOrganisation.email,
      role: updatedOrganisation.user,
    });

    const encryptAccessToken = encryptToken(accessToken);
    const encryptRefreshToken = encryptToken(refreshToken);

    return {
      status: 201,
      message: "Updated organisation successfully!",
      accessToken: encryptAccessToken,
      refreshToken: encryptRefreshToken,
      organisation: updatedOrganisation,
    } as ReturnRegisteredOrganisation;
  },

  // DElETE ORGANISATION USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  deleteOrganisation: async (_, { emailInput }, { prisma, auth }) => {
    const token = decryptToken(auth) as string;
    const user = getUser(token);
    const { email: loginUserEmail, role } = user;

    // Authenticate user
    if (!user || loginUserEmail === '' || role === '')
      throw new AuthenticationError("User not authenticated!");

    // Authorize the user to be either a Organisation or an Admin
    if (role !== 'Organisation' && role !== 'Admin')
      throw new AuthenticationError("Not authorized!");

    const { email } = emailInput;

    // Validate Input field
    const validate = DelOrganisationInputSchema.validate(emailInput);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Error! Invalid organisation ID!"
      );

    // Check if Organisation Already Exist
    const organisationExist = await prisma.organisation.findUnique({
      where: { email },
    });

    if (!organisationExist) {
      throw new AuthenticationError("Organisation doesn't exist!");
    }

    // Authorized Genuine Login User
    if (loginUserEmail !== email) {
      throw new AuthenticationError("Not authorized: not a genuine user!");
    }

    // Delete Organisation
    const deletedOrganisation = await prisma.organisation.delete({
      where: { email: loginUserEmail },
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
