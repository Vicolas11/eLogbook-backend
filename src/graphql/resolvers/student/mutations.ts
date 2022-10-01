import { DelStudentInputSchema, StudentInputSchema, UpdateStudentInputSchema } from "../../../joi/student.joi";
import { DeletedStudent, MutationResolvers, ReturnRegisteredStudent } from "../../generated";
import { signAccessJWToken, signRefreshJWToken } from "../../../utils/jwt.util";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { hashPassword } from "../../../utils/hashedPwd.util";
import { v4 as uuid } from "uuid";

const studentMutations: MutationResolvers = {
  // CREATE STUDENT USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  student: async (_, { registerInput: input }, { prisma }) => {
    // Validate Input field
    const validate = StudentInputSchema.validate(input);
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

    // Create New Student User
    const studentData = {
      ...input,
      id: uuid(),
    };
    const newStudent = await prisma.student.create({ data: studentData });

    // Remove the password field for security reasons
    Reflect.deleteProperty(newStudent, "password");

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      studentID: newStudent?.id,
    });
    const refreshToken = await signRefreshJWToken({
      studentID: newStudent?.id,
    });

    return {
      status: 201,
      message: "Created student successfully!",
      accessToken,
      refreshToken,
      student: newStudent,
    } as ReturnRegisteredStudent;
  },

  // UPDATE STUDENT USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  updateStudent: async (_, { updateInput: input }, { prisma }) => {
    const {
      email,
      firstName,
      lastName,
      phone,
      address,
      level,
      gender,
      avatar,
    } = input;

    // Validate Input field
    const validate = UpdateStudentInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Check if Email Already Exist
    const studentExist = await prisma.student.findUnique({
      where: { email: email },
    });
    if (!studentExist) {
      throw new AuthenticationError("Student doesn't exist!");
    }

    // Update Student User
    const updateStudentData = {
      firstName,
      lastName,
      phone,
      address,
      level,
      gender,
      avatar,
    };

    const updatedStudent = await prisma.student.update({
      where: { email: email },
      data: updateStudentData,
    });

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      studentID: updatedStudent.id,
    });
    const refreshToken = await signRefreshJWToken({
      studentID: updatedStudent.id,
    });

    return {
      status: 201,
      message: "Updated student successfully!",
      accessToken,
      refreshToken,
      student: updatedStudent,
    } as ReturnRegisteredStudent;
  },

  // DElETE STUDENT USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  deleteStudent: async (_, { emailInput }, { prisma }) => {
    const { email } = emailInput;

    // Validate Input field
    const validate = DelStudentInputSchema.validate(emailInput);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Error! Invalid student ID!"
      );

    // Check if Student Already Exist
    const studentExist = await prisma.student.findUnique({
      where: { email: email },
    });
    if (!studentExist) {
      throw new AuthenticationError("Student doesn't exist!");
    }

    // Delete Student
    const deletedStudent = await prisma.student.delete({
      where: { email: email },
    });
    const { id: deletedId, firstName, lastName, matricNo } = deletedStudent;

    return {
      status: 200,
      message: "Deleted student successfully!",
      id: deletedId,
      firstName,
      lastName,
      matricNo,
    } as DeletedStudent;
  },
};

export default studentMutations;
