import { DelLogbookInputSchema, LogbookInputSchema, UpdateLogbookInputSchema } from "../../../joi/logbook.joi";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { MutationResolvers, ResponseLogbook } from "../../generated";
import { v4 as uuid } from "uuid";

const logbookMutations: MutationResolvers = {
  // CREATE LOGBOOK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  logbook: async (_, { input }, { prisma }) => {
    const { email, day, title, description, diagram, label } = input;
    // Input Validation
    const validate = LogbookInputSchema.validate(input);
    const { error } = validate;
    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Validate if Student Logbook with same Day and Title existed
    const studLogbook = await prisma.logbook.findFirst({
      where: { AND: [{ day }, { title }], student: { email } },
    });

    if (studLogbook)
      throw new AuthenticationError(
        "Logbook with this Day and Title already exist!"
      );

    // Validate if the Logbook associated Student Exist
    const student = await prisma.student.findUnique({
      where: { email },
    });

    if (!student)
      throw new AuthenticationError(
        "Logbook associated student doesn't existed!"
      );

    // Create Logbook and connect to the Login Student
    const inputData = { id: uuid(), day, title, description, diagram, label };
    const logbook = await prisma.logbook.create({
      data: {
        ...inputData,
        student: {
          connect: { email },
        },
      },
      include: {
        student: true,
      },
    });

    return {
      status: 201,
      message: "Logbook created and connected successfully!",
      logbook,
    } as ResponseLogbook;
  },
  // UPDATE LOGBOOK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  updateLogbook: async (_, { input }, { prisma }) => {
    const { id, email, day, title, description, diagram, label } = input;

    // Input Validation
    const validate = UpdateLogbookInputSchema.validate(input);
    const { error } = validate;
    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Validate if Student Logbook with same Day and Title existed
    const studLogbook = await prisma.logbook.findFirst({
      where: { AND: [{ day }, { title }], student: { email } },
    });

    if (studLogbook)
      throw new AuthenticationError(
        "Logbook with this Day and Title already existed!"
      );

    // Validate if the Logbook associated Student Exist
    const student = await prisma.student.findUnique({
      where: { email },
    });

    if (!student)
      throw new AuthenticationError(
        "Logbook associated student doesn't exist!"
      );

    // Update Logbook and connect to the Login Student
    const inputData = { title, description, diagram, label };
    const logbook = await prisma.logbook.update({
      where: { id },
      data: {
        ...inputData,
        student: {
          connect: { email },
        },
      },
      include: {
        student: true,
      },
    });

    return {
      status: 201,
      message: "Logbook updated and connected successfully!",
      logbook,
    } as ResponseLogbook;
  },
  // DELETE LOGBOOK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  deleteLogbook: async (_, { input }, { prisma }) => {
    const { id: logbookId, email: studentEmail } = input;

    // Input Validation
    const validate = DelLogbookInputSchema.validate(input);
    const { error } = validate;
    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Validate if Logbook exist
    const studLogbook = await prisma.logbook.findFirst({
      where: {
        id: logbookId,
        student: { email: studentEmail },
      },
    });

    if (!studLogbook)
      throw new AuthenticationError(
        "Logbook associated student doesn't exist!"
      );

    // Validate if the Logbook associated Student Exist
    const student = await prisma.student.findUnique({
      where: { email: studentEmail },
    });

    if (!student)
      throw new AuthenticationError(
        "Logbook associated student doesn't exist!"
      );

    // Delete the connected Student Logbook
    const logbook = await prisma.logbook.delete({ where: { id: logbookId } });

    return {
      status: 200,
      message: "Deleted logbook successfully!",
      logbook,
    } as ResponseLogbook;
  },
};

export default logbookMutations;
