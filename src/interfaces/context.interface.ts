import { PrismaClient, Student } from "@prisma/client";

export interface IContext {
  loaders: {
    student: {
      one: (id: string) => Promise<Student>;
    };
  };
  prisma: PrismaClient;
}
