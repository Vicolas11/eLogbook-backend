import { AuthenticationError } from "apollo-server-express";
import { Coordinator } from "@prisma/client";
import { prisma } from "../context";

export const getAllCoordinators = async (): Promise<Coordinator[]> => {
  const coordinators = await prisma.coordinator.findMany({
    include: {
      students: true,
      supervisors: true,
    },
  });
  return coordinators;
};

const getCoordinatorByID = async (id: string): Promise<Coordinator | null> => {
  console.log(`Called getUserById for id: ${id}`);
  const coordinator = await prisma.coordinator.findUnique({
    where: { id },
    include: {
      students: true,
      supervisors: true,
    },
  });

  if (!coordinator) 
    throw new AuthenticationError("Coordinator not found!");
    
  return coordinator;
};

export const getCoordinatorByIDs = (ids: string[]): Promise<Coordinator | null>[] => {
  return ids.map((id) => getCoordinatorByID(id));
};
