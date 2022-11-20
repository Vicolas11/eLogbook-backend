import { signAccessJWToken, signRefreshJWToken } from "../../../utils/jwt.util";
import { QueryResolvers, ReturnRegisteredOrganisation } from "../../generated";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { validatePassword } from "../../../utils/hashedPwd.util";
import { encryptToken } from "../../../utils/crypto.utils";
import { LoginInputSchema } from "../../../joi/login.joi";

const organisationLogin: QueryResolvers = {
  loginOrganisation: async (_, { loginInput: input }, { prisma }) => {
    const { email, password: pwd } = input;

    // Validate Input field
    const validate = LoginInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Verify User and it's Role
    const organisation = await prisma.organisation.findUnique({ where: { email } });
    if (!organisation) throw new AuthenticationError("Organisation doesn't exist!");
    if (organisation.user !== "Organisation")
      throw new AuthenticationError("Invalid user type!");

    // Verify Password
    const hashPwd = organisation.password;
    const hasMatched = await validatePassword({ pwd, hashPwd });
    if (!hasMatched) throw new AuthenticationError("Invalid Password!");

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      id: organisation.id,
      email: organisation.email,
      role: organisation.user,
    });

    const refreshToken = await signRefreshJWToken({
      id: organisation.id,
      email: organisation.email,
      role: organisation.user,
    });

    // Remove Password field for security reasons
    Reflect.deleteProperty(organisation, "password");

    const encryptAccessToken = encryptToken(accessToken);
    const encryptRefreshToken = encryptToken(refreshToken);

    return {
      status: 201,
      message: "Login successfully!",
      accessToken: encryptAccessToken,
      refreshToken: encryptRefreshToken,
      organisation,
    } as ReturnRegisteredOrganisation;
  },
};

export default organisationLogin;
