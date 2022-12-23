import { signAccessJWToken, signRefreshJWToken } from "../../../utils/jwt.util";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { QueryResolvers, ReturnRegisteredAdmin } from "../../generated";
import { validatePassword } from "../../../utils/hashedPwd.util";
import { adminLoginInputSchema } from "../../../joi/login.joi";
import { encryptToken } from "../../../utils/crypto.utils";


const adminLogin: QueryResolvers = {
  loginAdmin: async (_, { loginInput: input }, { prisma }) => {
    const { email, password: pwd } = input;

    // Validate Input field
    const validate = adminLoginInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Verify User and it's Role
    const admin = await prisma.admin.findUnique({
      where: { email },
    });
    if (!admin) throw new AuthenticationError("Admin doesn't exist!");
    if (admin.user !== "Admin")
      throw new AuthenticationError("Invalid user type!");

    // Verify Password
    const hashPwd = admin.password;
    const hasMatched = await validatePassword({ pwd, hashPwd });
    if (!hasMatched) throw new AuthenticationError("Invalid Password!");

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      id: admin.id,
      email: admin.email,
      role: admin.user,
    });

    const refreshToken = await signRefreshJWToken({
      id: admin.id,
      email: admin.email,
      role: admin.user,
    });

    // Remove Password field for security reasons
    Reflect.deleteProperty(admin, "password");

    const encryptAccessToken = encryptToken(accessToken);
    const encryptRefreshToken = encryptToken(refreshToken);

    return {
      admin,
      status: 201,
      message: "Login successfully!",
      accessToken: encryptAccessToken,
      refreshToken: encryptRefreshToken,
    } as ReturnRegisteredAdmin;
  },
};

export default adminLogin;
