import { signAccessJWToken, signRefreshJWToken } from "../../../utils/jwt.util";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { QueryResolvers, ReturnRegisteredStudent } from "../../generated";
import { validatePassword } from "../../../utils/hashedPwd.util";
import { encryptToken } from "../../../utils/crypto.utils";
import { LoginInputSchema } from "../../../joi/login.joi";

const studentLogin: QueryResolvers = {
  loginStudent: async (_, { loginInput: input }, { prisma }) => {
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
    const student = await prisma.student.findUnique({
      where: { email },
      include: { 
        coordinator: true, 
        supervisor: true, 
        organisation: true 
      },
    });
    if (!student) throw new AuthenticationError("Student doesn't exist!");
    if (student.user !== "Student")
      throw new AuthenticationError("Invalid user type!");

    // Verify Password
    const hashPwd = student.password;
    const hasMatched = await validatePassword({ pwd, hashPwd });
    if (!hasMatched) throw new AuthenticationError("Invalid Password!");

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      id: student.id,
      email: student.email,
      role: student.user,
    });

    const refreshToken = await signRefreshJWToken({
      id: student.id,
      email: student.email,
      role: student.user,
    });

    // Remove Password field for security reasons
    Reflect.deleteProperty(student, "password");

    const encryptAccessToken = encryptToken(accessToken);
    const encryptRefreshToken = encryptToken(refreshToken);

    return {
      status: 201,
      message: "Login successfully!",
      accessToken: encryptAccessToken,
      refreshToken: encryptRefreshToken,
      student,
    } as ReturnRegisteredStudent;
  },
};

export default studentLogin;
