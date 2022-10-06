import { replicateAdminAuth, replicateSupAuth } from "../../../utils/replacate.utils";
import { getAllSupervisors } from "../../data/supervisorData";
import { QueryResolvers, Supervisor } from "../../generated";

const supervisorQueries: QueryResolvers = {
  // Get Supervisor by loginUserId
  supervisor: async (_, { id }, { loaders, auth, prisma }) => {
    const loginUserId = await replicateSupAuth(auth, id, prisma)
    const query = await loaders.supervisor.one(loginUserId);
    return query as Supervisor;
  },
  // Get All Supervisors
  supervisors: async (_, _args, { auth }) => {
    replicateAdminAuth(auth);
    const query = await getAllSupervisors();
    return query as Array<Supervisor>;
  },
};

export default supervisorQueries;
