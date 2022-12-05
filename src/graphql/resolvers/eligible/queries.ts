import { replicateAdminAuth, replicateCoordAuth } from "../../../utils/replacate.utils";
import { getAllEligibles, getAllEligiblesByDepts } from "../../data/eligibleData";
import { QueryResolvers, Eligible } from "../../generated";
import { decryptToken } from "../../../utils/crypto.utils";

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

  // Get all eligibles by Depts and Institution
  eligiblesByDept: async (_, { input }, { auth, prisma }) => {
    const {  id, department, institute } = input;
    const token = decryptToken(auth) as string;
    replicateCoordAuth(token, id, prisma);
    const query = await getAllEligiblesByDepts(department, institute);
    return query as Array<Eligible>;
  },
};

export default eligibleQueries;
