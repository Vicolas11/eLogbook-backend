import { Request } from "express";
import {
  BlogPost,
  Coordinator,
  Eligible,
  Organisation,
  PrismaClient,
  Student,
  Supervisor,
} from "@prisma/client";

export interface IContext {
  loaders: {
    student: {
      one: (id: string) => Promise<Student>;
    };
    supervisor: {
      one: (id: string) => Promise<Supervisor>;
    };
    coordinator: {
      one: (id: string) => Promise<Coordinator>;
    };
    organisation: {
      one: (id: string) => Promise<Organisation>;
    };
    blogPost: {
      one: (id: string) => Promise<BlogPost>;
    };
    eligible: {
      one: (id: string) => Promise<Eligible>;
    };
  };
  prisma: PrismaClient;
  auth: string;
  req: Request;
}
