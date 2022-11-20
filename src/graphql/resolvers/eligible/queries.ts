import { replicateAdminAuth, replicateCoordAuth } from "../../../utils/replacate.utils";
import { QueryResolvers, Eligible } from "../../generated";
import { decryptToken } from "../../../utils/crypto.utils";
import { getAllEligibles } from "../../data/eligibleData";

const eligibleQueries: QueryResolvers = {
  // Get eligible by Login userID
  eligible: async (_, { id }, { loaders, auth, prisma }) => {
    // const token = decryptToken(auth) as string;
    // const loginUserId = await replicateCoordAuth(token, id, prisma);
    const query = await loaders.eligible.one(id);
    return query as Eligible;
  },
  
  // Get all eligibles
  eligibles: async (_, _args, { auth }) => {
    const token = decryptToken(auth) as string;
    replicateAdminAuth(token);
    const query = await getAllEligibles();
    return query as Array<Eligible>;
  },
};

export default eligibleQueries;
