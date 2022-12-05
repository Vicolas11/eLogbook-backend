import { DelEligibleInputSchema, EligibleInputSchema, UpdateEligibleInputSchema } from "../../../joi/eligible.joi";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { MutationResolvers, ReturnRegisterEligible } from "../../generated";
import { decryptToken } from "../../../utils/crypto.utils";
import { Eligible, Prisma } from "@prisma/client";
import getUser from "../../../utils/getuser.util";
import { v4 as uuid } from "uuid";

const eligibleMutations: MutationResolvers = {
  // CREATE ELIGIBLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  eligible: async (_, { registerInput: input }, { prisma, auth }) => {
    const token = decryptToken(auth) as string;
    const user = getUser(token);
    const { email, role } = user;

    // Authenticate user
    if (!user || email === "" || role === "")
      throw new AuthenticationError("User not authenticated!");

    // Authorize the user to be either a Coordinator or an Admin
    if (role !== "Coordinator" && role !== "Admin")
      throw new AuthenticationError("Not authorized!");

    const { matricNo, level, email: supervisorEmail } = input;

    // Validate Input field
    const validate = EligibleInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Validate if the Coodinator Existed!
    const coordinator = await prisma.coordinator.findUnique({
      where: { email },
    });

    if (!coordinator)
      throw new AuthenticationError("Assigned Coordinator doesn't exist!");

    // Validate if the Supervisor Existed!
    const supervisor = await prisma.supervisor.findUnique({
      where: { email: supervisorEmail },
    });

    if (!supervisor)
      throw new AuthenticationError("Assigned Supervisor doesn't exist!");

    const institute = coordinator.institute;
    const department = coordinator.department;

    // Get All the Matric Numbers send by the Coordinator
    const matricNums: string[] = matricNo.split(",");
    const eligibles: Prisma.EligibleCreateInput[] = matricNums.map((num) => {
      return {
        matricNo: num.trim(),
        level,
        institute,
        department,
        id: uuid(),
      };
    });

    // Check if Eligible Already Exist
    const eligibleExist = await prisma.eligible.findFirst({
      where: {
        OR: [
          {
            AND: [
              { matricNo: { in: matricNums } },
              { institute },
              { department },
            ],
          },
          {
            matricNo: {
              in: matricNums,
            },
          },
        ],
      },
    });

    if (eligibleExist)
      throw new AuthenticationError(
        "One or more of these matric number's eligible already existed!"
      );

    // Create New Eligiblilit(ies)
    let eligible: Eligible = {
      id: "",
      institute: "",
      department: "",
      level: "L4",
      matricNo: "",
      createdAt: null,
      supervisorId: null,
      coordinatorId: null,
    };

    await Promise.all(
      eligibles.map(async (eligData) => {
        eligible = await prisma.eligible.create({
          data: {
            ...eligData,
            supervisor: { connect: { email: supervisorEmail } },
            coordinator: { connect: { email } },
          },
          include: {
            supervisor: true
          }
        });
        return eligible;
      })
    );

    return {
      status: 201,
      message: "Created eligibles successfully!",
      eligible,
    } as ReturnRegisterEligible;
  },

  // UPDATE ELIGIBLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  updateEligible: async (_, { updateInput: input }, { prisma, auth }) => {
    const token = decryptToken(auth) as string;
    const user = getUser(token);
    const { id: loginUserId, email: loginUserEmail, role } = user;

    // Authenticate user
    if (!user || loginUserEmail === "" || role === "" || loginUserId == "")
      throw new AuthenticationError("User not authenticated!");

    // Authorize the user to be either a Coordinator or an Admin
    if (role !== "Coordinator" && role !== "Admin")
      throw new AuthenticationError("Not authorized!");

    const { id: eligibleId, level, email: supervisorEmail } = input;

    // Validate Input field
    const validate = UpdateEligibleInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Check if Eligibility Already Exist
    const eligibleExist = await prisma.eligible.findUnique({
      where: { id: eligibleId },
    });

    if (!eligibleExist) {
      throw new AuthenticationError("Eligibility doesn't exist!");
    }

    // Authorized if is the genuine user
    if (eligibleExist.coordinatorId !== loginUserId)
      throw new AuthenticationError("Not authorized: Not genuine user!");

    // Validate if the Supervisor Existed!
    const supervisor = await prisma.supervisor.findUnique({
      where: { email: supervisorEmail },
    });

    if (!supervisor)
      throw new AuthenticationError("Assigned Supervisor doesn't exist!");

    // Update Eligible User
    const data = { level };
    const updatedEligible = await prisma.eligible.update({
      where: { id: eligibleId },
      data: {
        ...data,
        supervisor: {
          connect: { email: supervisorEmail },
        },
      },
      include: {
        supervisor: true
      }
    });

    const matricNo = eligibleExist.matricNo;
    const student = await prisma.student.findFirst({ where: { matricNo } });
    const email = student?.email;

    // Update student's supervisor as well
    await prisma.student.update({
      where: { email },
      data: {
        supervisor: {
          connect: {
            email: supervisorEmail,
          },
        },
      },
    });

    return {
      status: 201,
      message: "Updated eligible successfully!",
      eligible: updatedEligible,
    } as ReturnRegisterEligible;
  },

  // DElETE ELIGIBLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  deleteEligible: async (_, { deleteInput: input }, { prisma, auth }) => {
    const token = decryptToken(auth) as string;
    const user = getUser(token);
    const { id: loginUserId, email: loginUserEmail, role } = user;

    // Authenticate user
    if (!user || loginUserEmail === "" || role === "" || loginUserId === "")
      throw new AuthenticationError("User not authenticated!");

    // Authorize the user to be either a Coordinator or an Admin
    if (role !== "Coordinator" && role !== "Admin")
      throw new AuthenticationError("Not authorized!");
    const { id } = input;

    // Validate Input field
    const validate = DelEligibleInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Error! Invalid eligible ID!"
      );

    // Check if Eligible Already Exist
    const eligibleExist = await prisma.eligible.findUnique({
      where: { id },
    });

    if (!eligibleExist) {
      throw new AuthenticationError("Eligible doesn't exist!");
    }

    // Authorize if loginUser is genuine
    if (eligibleExist.coordinatorId !== loginUserId)
      throw new AuthenticationError("Not authorized: Not genuine user!");

    // Delete Eligible
    const delEligible = await prisma.eligible.delete({
      where: { id },
    });

    return {
      status: 200,
      message: "Deleted eligible successfully!",
      eligible: delEligible,
    } as ReturnRegisterEligible;
  },
};

export default eligibleMutations;
