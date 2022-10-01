import { signAccessJWToken, signRefreshJWToken } from "../../../utils/jwt.util";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { QueryResolvers, ReturnRegisteredSupervisor } from "../../generated";
import { validatePassword } from "../../../utils/hashedPwd.util";
import { LoginInputSchema } from "../../../joi/login.joi";

const supervisorLogin: QueryResolvers = {
  loginSupervisor: async (_, { loginInput: input }, { prisma }) => {
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
    const supervisor = await prisma.supervisor.findUnique({ where: { email } });
    if (!supervisor) throw new AuthenticationError("Supervisor doesn't exist!");
    if (supervisor.user !== "Supervisor")
      throw new AuthenticationError("Invalid user type!");

    // Verify Password
    const hashPwd = supervisor.password;
    const hasMatched = await validatePassword({ pwd, hashPwd });
    if (!hasMatched) throw new AuthenticationError("Invalid Password!");

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      supervisorID: supervisor?.id,
    });
    const refreshToken = await signRefreshJWToken({
      supervisorID: supervisor?.id,
    });

    // Remove Password field for security reasons
    Reflect.deleteProperty(supervisor, "password");

    return {
      status: 201,
      message: "Login successfully!",
      accessToken,
      refreshToken,
      supervisor
    } as ReturnRegisteredSupervisor;
  },
};

export default supervisorLogin;
