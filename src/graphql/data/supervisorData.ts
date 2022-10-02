import { AuthenticationError } from "apollo-server-express";
import { Supervisor } from "@prisma/client";
import { prisma } from "../context";

export const getAllSupervisors = async (): Promise<Supervisor[]> => {
  const supervisors = await prisma.supervisor.findMany();
  return supervisors;
};

const getSupervisorByID = async (id: string): Promise<Supervisor | null> => {
  console.log(`Called getUserById for id: ${id}`);
  const supervisor = await prisma.supervisor.findUnique({ where: { id } });
  if (!supervisor) throw new AuthenticationError("Supervisor not found!");
  return supervisor;
};

export const getSupervisorByIDs = (ids: string[]): Promise<Supervisor | null>[] => {
  return ids.map((id) => getSupervisorByID(id));
};
