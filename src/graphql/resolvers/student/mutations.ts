import { DelStudentInputSchema, StudentInputSchema, UpdateStudentInputSchema } from "../../../joi/student.joi";
import { DeletedStudent, MutationResolvers, ReturnRegisteredStudent } from "../../generated";
import { signAccessJWToken, signRefreshJWToken } from "../../../utils/jwt.util";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { decryptToken, encryptToken } from "../../../utils/crypto.utils";
import { hashPassword } from "../../../utils/hashedPwd.util";
import titleCase from "../../../utils/titlecase.utl";
import getUser from "../../../utils/getuser.util";
import { v4 as uuid } from "uuid";

const studentMutations: MutationResolvers = {
  // CREATE STUDENT USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  student: async (_, { registerInput: input }, { prisma }) => {
    const {
      firstName,
      lastName,
      matricNo,
      address,
      institute,
      department,
      email,
      password,
      place: organisationEmail,
    } = input;

    // Validate Input field
    const validate = StudentInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Check if Student Already Exist
    const studentExist = await prisma.student.findFirst({
      where: { OR: [
        { email }, 
        { matricNo }
      ]},
    });

    if (studentExist) throw new AuthenticationError("Student already existed!");

    // Check if the Student is Eligible
    const eligible = await prisma.eligible.findUnique({
      where: { matricNo },
      include: {
        supervisor: true,
        coordinator: true,
      },
    });

    if (!eligible)
      throw new AuthenticationError(
        "Sorry, you aren't eligible to signup yet!"
      );

    // Check if the organisation existed
    const organisation = await prisma.organisation.findUnique({
      where: { email: organisationEmail },
    });

    if (!organisation)
      throw new AuthenticationError("This organisation doesn't exist!");

    // Get Student assigned Supervior and Coordinator emails
    const supervisorId = eligible.supervisor?.id;
    const cooordinatorId = eligible.coordinator?.id;
    const organisationId = organisation.id;

    // Hashed and Replaced Password Input
    const hashPwd = await hashPassword(password);
    input.password = hashPwd;
    input.firstName = titleCase(firstName);
    input.lastName = titleCase(lastName);
    input.email = email.toLowerCase();
    input.matricNo = matricNo.toUpperCase();
    input.institute = titleCase(institute);
    input.department = titleCase(department);
    input.address = titleCase(address);

    // Create New Student User
    const studentData = {
      ...input,
      id: uuid(),
    };

    const newStudent = await prisma.student.create({
      data: {
        ...studentData,
        eligible: true,
        supervisor: {
          connect: { id: supervisorId },
        },
        coordinator: {
          connect: { id: cooordinatorId },
        },
        organisation: {
          connect: { id: organisationId },
        },
      },
      include: {
        coordinator: true,
        supervisor: true,
        organisation: true
      }
    });

    // Remove the password field for security reasons
    Reflect.deleteProperty(newStudent, "password");

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      id: newStudent.id,
      email: newStudent.email,
      role: newStudent.user,
    });

    const refreshToken = await signRefreshJWToken({
      id: newStudent.id,
      email: newStudent.email,
      role: newStudent.user,
    });

    const encryptAccessToken = encryptToken(accessToken);
    const encryptRefreshToken = encryptToken(refreshToken);

    return {
      status: 201,
      message: "Created student successfully!",
      accessToken: encryptAccessToken,
      refreshToken: encryptRefreshToken,
      student: newStudent,
    } as ReturnRegisteredStudent;
  },

  // UPDATE STUDENT USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  updateStudent: async (_, { updateInput: input }, { prisma, auth }) => {
    const token = decryptToken(auth) as string;
    const user = getUser(token);
    const { email: loginUserEmail, role } = user;

    // Authenticate user
    if (!user || loginUserEmail === '' || role === '')
      throw new AuthenticationError("User not authenticated!");

    // Authorize the user to be either a Student or an Admin
    if (role !== 'Student' && role !== 'Admin')
      throw new AuthenticationError("Not authorized!");

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
      where: { email },
    });

    if (!studentExist) {
      throw new AuthenticationError("Student doesn't exist!");
    }

    // Authorized Genuine Login User
    if (loginUserEmail !== email) {
      throw new AuthenticationError("Not authorized: not a genuine user!");
    }

    input.firstName = titleCase(firstName);
    input.lastName = titleCase(lastName);
    input.address = titleCase(address);

    // Update Student User
    const data = {
      firstName,
      lastName,
      phone,
      address,
      level,
      gender,
      avatar,
    };

    const updatedStudent = await prisma.student.update({
      where: { email: loginUserEmail },
      data,
      include: {
        coordinator: true,
        supervisor: true,
        organisation: true
      }
    });

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      id: updatedStudent.id,
      email: updatedStudent.email,
      role: updatedStudent.user,
    });
    
    const refreshToken = await signRefreshJWToken({
      id: updatedStudent.id,
      email: updatedStudent.email,
      role: updatedStudent.user,
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
  deleteStudent: async (_, { emailInput }, { prisma, auth }) => {
    const token = decryptToken(auth) as string;
    const user = getUser(token);
    const { email: loginUserEmail, role } = user;

    // Authenticate user
    if (!user || loginUserEmail === '' || role === '')
      throw new AuthenticationError("User not authenticated!");

    // Authorize the user to be either a Student or an Admin
    if (role !== 'Student' && role !== 'Admin')
      throw new AuthenticationError("Not authorized!");
      
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
      where: { email },
    });

    if (!studentExist) {
      throw new AuthenticationError("Student doesn't exist!");
    }

    // Authorized Genuine Login User
    if (loginUserEmail !== email) {
      throw new AuthenticationError("Not authorized: not a genuine user!");
    }

    // Delete Student
    const deletedStudent = await prisma.student.delete({
      where: { email: loginUserEmail },
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
