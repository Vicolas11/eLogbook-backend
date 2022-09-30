import { getAllCoordinators } from "../../data/coordinatorData";
import { QueryResolvers, Coordinator } from "../../generated";

const coordinatorQueries: QueryResolvers = {
  coordinator: async (_, { id }, { loaders }) => {
    const query = await loaders.coordinator.one(id);
    return query as Coordinator;
  },
  
  coordinators: async () => {
    const query = await getAllCoordinators();
    return query as Array<Coordinator>;
  },
};

export default coordinatorQueries;
