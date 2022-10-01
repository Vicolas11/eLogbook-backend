import { DelEligibleInputSchema, EligibleInputSchema, UpdateEligibleInputSchema } from "../../../joi/eligible.joi";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import { MutationResolvers, ReturnRegisterEligible } from "../../generated";
import { Prisma } from "@prisma/client";
import { v4 as uuid } from "uuid";

const eligibleMutations: MutationResolvers = {
  
  // CREATE ELIGIBLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  eligible: async (_, { registerInput: input }, { prisma }) => {
    const { matricNo, institute, department, level, supervisor } = input;
    // Validate Input field
    const validate = EligibleInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Get All the Matric Numbers send by the Coordinator
    const matricNums: string[] = matricNo.split(",");
    const eligibles: Prisma.EligibleCreateInput[] = matricNums.map((num) => {
      return {
        matricNo: num,
        institute,
        department,
        level,
        supervisor,
      };
    });

    // Check if Eligible Already Exist
    const eligibleExist = await prisma.eligible.findFirst({
      where: {
        AND: [{ matricNo: { in: matricNums } }, { institute }, { department }],
      },
    });

    if (eligibleExist) throw new AuthenticationError("Eligible already exist!");

    // Create New Eligiblility
    await Promise.all(
      eligibles.map(async (eligData) => {
        prisma.eligible.create({ data: { ...eligData, id: uuid() } });
      })
    );

    return {
      status: 201,
      message: "Created eligible successfully!",
    } as ReturnRegisterEligible;
  },

  // UPDATE ELIGIBLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  updateEligible: async (_, { updateInput: input }, { prisma }) => {
    const { id, matricNo, level, supervisor } = input;

    // Validate Input field
    const validate = UpdateEligibleInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Check if Eligibility Already Exist
    const eligibleExist = await prisma.eligible.findFirst({
      where: { OR: [{ id }, { matricNo }] },
    });

    if (eligibleExist) {
      throw new AuthenticationError("Eligibility already exist!");
    }

    // Update Eligible User
    const data = { level, supervisor, matricNo };
    const updatedEligible = await prisma.eligible.update({
      where: { id },
      data,
    });

    return {
      status: 201,
      message: "Updated eligible successfully!",
      eligible: updatedEligible,
    } as ReturnRegisterEligible;
  },

  // DElETE ELIGIBLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  deleteEligible: async (_, { deleteInput: input }, { prisma }) => {
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
