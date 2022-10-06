import { getOrganisationByIDs } from "./data/organisationData";
import { getCoordinatorByIDs } from "./data/coordinatorData";
import { IRequest } from "../interfaces/request.interface";
import { IContext } from "../interfaces/context.interface";
import { getSupervisorByIDs } from "./data/supervisorData";
import { getBlogPostByIDs } from "./data/blogpostData";
import { getEligibleByIDs } from "./data/eligibleData";
import { ContextFunction } from "apollo-server-core";
import { getStudentByIDs } from "./data/studentData";
import { PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";

const prisma = new PrismaClient();

// STUDENT LOADER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const studentLoader = () => {
  const loader = new DataLoader(async (ids) => {
    return getStudentByIDs(ids as string[]);
  });

  return {
    one: async (id: string) => loader.load(id),
  };
};

// SUPERVISOR LOADER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const supervisorLoader = () => {
  const loader = new DataLoader(async (ids) => {
    return getSupervisorByIDs(ids as string[]);
  });

  return {
    one: async (id: string) => loader.load(id),
  };
};

// COORDINATOR LOADER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const coordinatorLoader = () => {
  const loader = new DataLoader(async (ids) => {
    return getCoordinatorByIDs(ids as string[]);
  });

  return {
    one: async (id: string) => loader.load(id),
  };
};

// ORGANISATION LOADER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const organisationLoader = () => {
  const loader = new DataLoader(async (ids) => {
    return getOrganisationByIDs(ids as string[]);
  });

  return {
    one: async (id: string) => loader.load(id),
  };
};

const blogPostLoader = () => {
  const loader = new DataLoader(async (ids) => {
    return getBlogPostByIDs(ids as string[]);
  });

  return {
    one: async (id: string) => loader.load(id),
  };
};

const eligibleLoader = () => {
  const loader = new DataLoader(async (ids) => {
    return getEligibleByIDs(ids as string[]);
  });

  return {
    one: async (id: string) => loader.load(id),
  };
};

const context: ContextFunction<IContext> = async ({ req }: IRequest) => {
  const auth = req.headers.authorization || "";
  return {
    loaders: {
      student: studentLoader(),
      supervisor: supervisorLoader(),
      coordinator: coordinatorLoader(),
      organisation: organisationLoader(),
      blogPost: blogPostLoader(),
      eligible: eligibleLoader(),
    },
    prisma,
    auth: auth,
  };
};

export { prisma };
export default context;
