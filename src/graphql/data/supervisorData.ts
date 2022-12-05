import { AuthenticationError } from "apollo-server-express";
import { Supervisor } from "@prisma/client";
import { prisma } from "../context";

export const getAllSupervisors = async (): Promise<Supervisor[]> => {
  const supervisors = await prisma.supervisor.findMany();
  return supervisors;
};

export const getSupervisorByDept = async (department: string, institute: string): Promise<Supervisor[] | null> => {
  const supervisor = await prisma.supervisor.findMany({ 
    where: { 
      AND: [ 
        {department}, 
        {institute}
      ]
    }
  });
  if (!supervisor) throw new AuthenticationError("Supervisor not found!");
  return supervisor;
};

const getSupervisorByID = async (id: string): Promise<Supervisor | null> => {
  console.log(`Called getUserById for id: ${id}`);
  const supervisor = await prisma.supervisor.findUnique({
    where: { id },
    include: {
      coordinator: true,
      students: true,
    },
  });
  if (!supervisor) throw new AuthenticationError("Supervisor not found!");
  return supervisor;
};

export const getSupervisorByIDs = (
  ids: string[]
): Promise<Supervisor | null>[] => {
  return ids.map((id) => getSupervisorByID(id));
};
