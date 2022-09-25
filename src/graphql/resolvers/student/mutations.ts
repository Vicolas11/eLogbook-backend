import { signAccessJWToken, signRefreshJWToken } from "../../../utils/jwt.util";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { MutationResolvers, ReturnRegisteredStudent } from "../../generated";
import { RegisterStudentInputSchema } from "../../../joi/student.joi";
import { hashPassword } from "../../../utils/hashedPwd.util";
import { v4 as uuid } from "uuid";

const studentMutations: MutationResolvers = {
  // New Student Creation
  student: async (_, { registeredInput: input }, { prisma }) => {
    // Validate Input field
    const validate = RegisterStudentInputSchema.validate(input);
    const { error } = validate;
    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Check if Email Already Exist
    const studentExist = await prisma.student.findUnique({
      where: { email: input.email },
    });
    if (studentExist) throw new AuthenticationError("Student already existed!");

    // Hashed and Replaced Password Input
    const hashPwd = await hashPassword(input.password);
    input.password = hashPwd;

    // Create New User
    const studentData = {
      id: uuid(),
      ...input,
    };

    // Add A new user to the database
    const newStudent = await prisma.student.create({ data: studentData });

    // Remove the password field for security reasons
    Reflect.deleteProperty(newStudent, "password");

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({ studentID: newStudent.id });
    const refreshToken = await signRefreshJWToken({ studentID: newStudent.id });

    return {
      accessToken,
      refreshToken,
      student: newStudent,
    } as ReturnRegisteredStudent;
  },
};

export default studentMutations;
