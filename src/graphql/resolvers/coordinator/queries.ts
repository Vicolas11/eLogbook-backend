import { replicateAdminAuth, replicateCoordAuth } from "../../../utils/replacate.utils";
import { getAllCoordinators } from "../../data/coordinatorData";
import { QueryResolvers, Coordinator } from "../../generated";

const coordinatorQueries: QueryResolvers = {
  coordinator: async (_, { id }, { loaders, auth, prisma }) => {
    const loginUserId = await replicateCoordAuth(auth, id, prisma);
    const query = await loaders.coordinator.one(loginUserId);
    return query as Coordinator;
  },
  
  coordinators: async (_, _args, { auth }) => {
    replicateAdminAuth(auth);
    const query = await getAllCoordinators();
    return query as Array<Coordinator>;
  },
};

export default coordinatorQueries;
