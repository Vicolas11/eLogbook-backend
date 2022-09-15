import { ContextFunction } from "apollo-server-core";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type ContextType = {
  primsa: PrismaClient;
};

const context: ContextFunction<ContextType> = async () => {
  prisma;
};

export default context;
