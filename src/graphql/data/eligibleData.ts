import { AuthenticationError } from "apollo-server-express";
import { Eligible } from "@prisma/client";
import { prisma } from "../context";

export const getAllEligibles = async(): Promise<Eligible[]> => {
  const eligibles = await prisma.eligible.findMany({
    include: {
      supervisor: true,
      coordinator: true,
    },
  });
  return eligibles;
};

export const getAllEligiblesByDepts = async(department: string, institute: string): Promise<Eligible[]> => {
  const eligibles = await prisma.eligible.findMany({
    where: { 
      AND: [ 
        {department}, 
        {institute}
      ]
    },
    include: {
      supervisor: true
    },
  });
  if (!eligibles)
    throw new AuthenticationError("Eligiblility not found!");
  return eligibles;
};

const getEligibleByID = async(id: string): Promise<Eligible | null> => {
  console.log(`Called getUserById for id: ${id}`);
  const eligible = await prisma.eligible.findFirst({
    where: { OR: [{ id }, { matricNo: id }] },
    include: {
      supervisor: true,
      coordinator: true,
    },
  });
  if (!eligible) throw new AuthenticationError("Eligiblility not found!");
  return eligible;
};

export const getEligibleByIDs = (ids: string[]): Promise<Eligible | null>[] => {
  return ids.map((id) => getEligibleByID(id));
};
