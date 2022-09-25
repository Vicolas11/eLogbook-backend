import { QueryResolvers, Student } from "../../generated";
import { getAllStudents } from "../../data";

const studentQueries: QueryResolvers = {
  student: async (_, { id }, { loaders }) => {
    const query = await loaders.student.one(id);
    return query as Student;
  },
  students: async () => {
    const query = await getAllStudents();
    return query as Array<Student>;
  },
};

export default studentQueries;
