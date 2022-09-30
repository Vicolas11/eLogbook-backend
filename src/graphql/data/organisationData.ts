import { AuthenticationError } from "apollo-server-express";
import { Organisation } from "@prisma/client";
import { prisma } from "../context";

export const getAllOrganisations = async (): Promise<Organisation[]> => {
  const organisations = await prisma.organisation.findMany();
  return organisations;
};

const getOrganisationByID = async (id: string): Promise<Organisation | null> => {
  console.log(`Called getUserById for id: ${id}`);
  const organisation = await prisma.organisation.findUnique({ where: { id: id } });
  if (!organisation) throw new AuthenticationError("Organisation not found!");
  return organisation;
};

export const getOrganisationByIDs = (ids: string[]): Promise<Organisation | null>[] => {
  return ids.map((id) => getOrganisationByID(id));
};
