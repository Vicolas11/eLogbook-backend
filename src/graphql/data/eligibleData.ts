import { AuthenticationError } from "apollo-server-express";
import { Eligible } from "@prisma/client";
import { prisma } from "../context";

export const getAllEligibles = async (): Promise<Eligible[]> => {
  const eligibles = await prisma.eligible.findMany();
  return eligibles;
};

const getEligibleByID = async (id: string): Promise<Eligible | null> => {
  console.log(`Called getUserById for id: ${id}`);
  const eligible = await prisma.eligible.findFirst({
    where: { OR: [{ id }, { matricNo: id }] },
  });
  if (!eligible) throw new AuthenticationError("Eligiblility not found!");
  return eligible;
};

export const getEligibleByIDs = (ids: string[]): Promise<Eligible | null>[] => {
  return ids.map((id) => getEligibleByID(id));
};
