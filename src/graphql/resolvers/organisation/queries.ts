import { replicateAdminAuth, replicateOrgAuth } from "../../../utils/replacate.utils";
import { getAllOrganisations } from "../../data/organisationData";
import { QueryResolvers, Organisation } from "../../generated";
import { decryptToken } from "../../../utils/crypto.utils";

const organisationQueries: QueryResolvers = {
  // Get Organisation by loginUserId
  organisation: async (_, { id }, { loaders, auth, prisma }) => {
    const token = decryptToken(auth) as string;
    const loginUserId = await replicateOrgAuth(token, id, prisma);
    const query = await loaders.organisation.one(loginUserId);
    return query as Organisation;
  },
  // Get all Organisation
  organisations: async (_, _args, { auth }) => {
    // const token = decryptToken(auth) as string;
    // replicateAdminAuth(token);
    const query = await getAllOrganisations();
    return query as Array<Organisation>;
  },
};

export default organisationQueries;
