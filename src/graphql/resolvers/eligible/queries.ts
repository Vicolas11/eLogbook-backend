import { QueryResolvers, Eligible } from "../../generated";
import { getAllEligibles } from "../../data/eligible";

const eligibleQueries: QueryResolvers = {
  eligible: async (_, { id }, { loaders }) => {
    const query = await loaders.eligible.one(id);
    return query as Eligible;
  },
  eligibles: async () => {
    const query = await getAllEligibles();
    return query as Array<Eligible>;
  },
};

export default eligibleQueries;
