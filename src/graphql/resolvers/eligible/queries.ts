import { replicateAdminAuth, replicateCoordAuth } from "../../../utils/replacate.utils";
import { QueryResolvers, Eligible } from "../../generated";
import { getAllEligibles } from "../../data/eligibleData";

const eligibleQueries: QueryResolvers = {
  // Get eligible by Login userID
  eligible: async (_, { id }, { loaders, auth, prisma }) => {
    const loginUserId = await replicateCoordAuth(auth, id, prisma);
    const query = await loaders.eligible.one(loginUserId);
    return query as Eligible;
  },
  
  // Get all eligibles
  eligibles: async (_, _args, { auth }) => {
    replicateAdminAuth(auth);
    const query = await getAllEligibles();
    return query as Array<Eligible>;
  },
};

export default eligibleQueries;
