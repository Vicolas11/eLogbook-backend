import { replicateAdminAuth, replicateSupAuth } from "../../../utils/replacate.utils";
import { getAllSupervisors, getSupervisorByDept } from "../../data/supervisorData";
import { QueryResolvers, Supervisor } from "../../generated";
import { decryptToken } from "../../../utils/crypto.utils";

const supervisorQueries: QueryResolvers = {
  // Get Supervisor by loginUserId
  supervisor: async (_, { id }, { loaders, auth, prisma }) => {
    const token = decryptToken(auth) as string;
    const loginUserId = await replicateSupAuth(token, id, prisma)
    const query = await loaders.supervisor.one(loginUserId);
    return query as Supervisor;
  },
  // Get All Supervisors
  supervisors: async (_, _args, { auth }) => {
    const token = decryptToken(auth) as string;
    replicateAdminAuth(token);
    const query = await getAllSupervisors();
    return query as Array<Supervisor>;
  },
  // Get All Supervisors Department and Institution
  supervisorsByDepts: async (_, { input }) => {
    const {department, institute} = input;
    const query = await getSupervisorByDept(department, institute);
    return query as Array<Supervisor>;
  },
};

export default supervisorQueries;
