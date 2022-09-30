import { getAllSupervisors } from "../../data/supervisorData";
import { QueryResolvers, Supervisor } from "../../generated";

const supervisorQueries: QueryResolvers = {
  supervisor: async (_, { id }, { loaders }) => {
    const query = await loaders.supervisor.one(id);
    return query as Supervisor;
  },
  
  supervisors: async () => {
    const query = await getAllSupervisors();
    return query as Array<Supervisor>;
  },
};

export default supervisorQueries;
