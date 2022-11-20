import { replicateAdminAuth, replicateCoordAuth } from "../../../utils/replacate.utils";
import { getAllCoordinators } from "../../data/coordinatorData";
import { QueryResolvers, Coordinator } from "../../generated";
import { decryptToken } from "../../../utils/crypto.utils";

const coordinatorQueries: QueryResolvers = {
  coordinator: async (_, { id }, { loaders, auth, prisma }) => {
    const token = decryptToken(auth) as string;
    const loginUserId = await replicateCoordAuth(token, id, prisma);
    const query = await loaders.coordinator.one(loginUserId);
    return query as Coordinator;
  },
  
  coordinators: async (_, _args, { auth }) => {
    const token = decryptToken(auth) as string;
    replicateAdminAuth(token);
    const query = await getAllCoordinators();
    return query as Array<Coordinator>;
  },
};

export default coordinatorQueries;
