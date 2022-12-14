import { signAccessJWToken, signRefreshJWToken } from "../../../utils/jwt.util";
import { QueryResolvers, ReturnRegisteredCoordinator } from "../../generated";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { validatePassword } from "../../../utils/hashedPwd.util";
import { encryptToken } from "../../../utils/crypto.utils";
import { LoginInputSchema } from "../../../joi/login.joi";

const coordinatorLogin: QueryResolvers = {
  loginCoordinator: async (_, { loginInput: input }, { prisma }) => {
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
    const coordinator = await prisma.coordinator.findUnique({ where: { email } });
    if (!coordinator) throw new AuthenticationError("Coordinator doesn't exist!");
    if (coordinator.user !== "Coordinator")
      throw new AuthenticationError("Invalid user type!");

    // Verify Password
    const hashPwd = coordinator.password;
    const hasMatched = await validatePassword({ pwd, hashPwd });
    if (!hasMatched) throw new AuthenticationError("Invalid Password!");

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      id: coordinator.id,
      email: coordinator.email,
      role: coordinator.user,
    });

    const refreshToken = await signRefreshJWToken({
      id: coordinator.id,
      email: coordinator.email,
      role: coordinator.user,
    });

    // Remove Password field for security reasons
    Reflect.deleteProperty(coordinator, "password");

    const encryptAccessToken = encryptToken(accessToken);
    const encryptRefreshToken = encryptToken(refreshToken);

    return {
      status: 201,
      message: "Login successfully!",
      accessToken: encryptAccessToken,
      refreshToken: encryptRefreshToken,
      coordinator,
    } as ReturnRegisteredCoordinator;
  },
};

export default coordinatorLogin;
