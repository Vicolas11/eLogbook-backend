import { IContext } from "../interfaces/context.interface";
import { ContextFunction } from "apollo-server-core";
import { PrismaClient } from "@prisma/client";
import { getStudentByIDs } from "./data";
import DataLoader from "dataloader";

const prisma = new PrismaClient();

const studentLoader = () => {
  const loader = new DataLoader(async (ids) => {
    return getStudentByIDs(ids as string[]);
  });

  return {
    one: async (id: string) => loader.load(id)
  };
};

const context: ContextFunction<IContext> = async () => {
  return {
    loaders: { student: studentLoader() },
    prisma,
  };
};

export { prisma };
export default context;
