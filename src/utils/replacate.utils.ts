import { AuthenticationError } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";
import getUser from "./getuser.util";

export const replicateStudAuth = async(auth: string, id: string, prisma: PrismaClient): Promise<string> => {
  const user = getUser(auth);
  const { id: loginUserId, role } = user;

  // Authenticate user
  if (!user || loginUserId === "" || role === "")
    throw new AuthenticationError("User not authenticated!");

  // Authorize the user to be either a Student or an Admin
  if (role !== "Student" && role !== "Admin")
    throw new AuthenticationError("Not authorized!");
  
  // Check if Student Already Exist
  const studExist = await prisma.student.findUnique({
    where: { id },
  });

  if (!studExist)
    throw new AuthenticationError("Student doesn't exist!");

  if (loginUserId !== id) 
    throw new AuthenticationError("Not authorized!");

  return loginUserId;
};

export const replicateSupAuth = async(auth: string, id: string, prisma: PrismaClient): Promise<string> => {
  const user = getUser(auth);
  const { id: loginUserId, role } = user;

  // Authenticate user
  if (!user || loginUserId === "" || role === "")
    throw new AuthenticationError("User not authenticated!");

  // Authorize the user to be Supervisor or an Admin
  if (role !== "Supervisor" && role !== "Admin")
    throw new AuthenticationError("Not authorized!");
  
  // Check if Supervisor Already Exist
  const supExist = await prisma.supervisor.findUnique({
    where: { id },
  });

  if (!supExist)
    throw new AuthenticationError("Supervisor doesn't exist!");

  if (loginUserId !== id) 
    throw new AuthenticationError("Not authorized!");

  return loginUserId;
};

export const replicateCoordAuth = async(auth: string, id: string, prisma: PrismaClient): Promise<string> => {
  const user = getUser(auth);
  const { id: loginUserId, role } = user;

  // Authenticate user
  if (!user || loginUserId === "" || role === "")
    throw new AuthenticationError("User not authenticated!");

  // Authorize the user to be either a Coordinator or an Admin
  if (role !== "Coordinator" && role !== "Admin")
    throw new AuthenticationError("Not authorized!");
  
  // Check if Coordinator Already Exist
  const cordExist = await prisma.coordinator.findUnique({
    where: { id },
  });

  if (!cordExist)
    throw new AuthenticationError("Coordinator doesn't exist!");

  if (loginUserId !== id) 
    throw new AuthenticationError("Not authorized!");

  return loginUserId;
};

export const replicateOrgAuth = async(auth: string, id: string, prisma: PrismaClient): Promise<string> => {
  const user = getUser(auth);
  const { id: loginUserId, role } = user;

  // Authenticate user
  if (!user || loginUserId === "" || role === "")
    throw new AuthenticationError("User not authenticated!");

  // Authorize the user to be either a Organisation or an Admin
  if (role !== "Organisation" && role !== "Admin")
    throw new AuthenticationError("Not authorized!");
  
  // Check if Organisation Already Exist
  const orgExist = await prisma.organisation.findUnique({
    where: { id },
  });

  if (!orgExist)
    throw new AuthenticationError("Organisation doesn't exist!");

  if (loginUserId !== id) 
    throw new AuthenticationError("Not authorized!");

  return loginUserId;
};

export const replicateAdminAuth = (auth: string): void => {
  const user = getUser(auth);
  const { email, role } = user;

  // Authenticate user
  if (!user || email === "" || role === "")
    throw new AuthenticationError("User not authenticated!");

  // Authorize the user to be either a Coordinator or an Admin
  if (role !== "Admin") 
    throw new AuthenticationError("Not authorized!");
};
