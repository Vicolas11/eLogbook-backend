import { AuthenticationError } from "apollo-server-express";
import { Student } from "@prisma/client";
import { prisma } from "../context";

export const getAllStudents = async (): Promise<Student[]> => {
  const students = await prisma.student.findMany({
    include: {
      logbooks: true,
      supervisor: true,
      coordinator: true,
      organisation: true,
    },
  });
  return students;
};

const getStudentByID = async (id: string): Promise<Student | null> => {
  console.log(`Called getUserById for id: ${id}`);
  const student = await prisma.student.findUnique({
    where: { id },
    include: {
      logbooks: true,
      supervisor: true,
      coordinator: true,
      organisation: true,
    },
  });
  if (!student) throw new AuthenticationError("Student not found!");
  return student;
};

export const getStudentByIDs = (ids: string[]): Promise<Student | null>[] => {
  return ids.map((id) => getStudentByID(id));
};
