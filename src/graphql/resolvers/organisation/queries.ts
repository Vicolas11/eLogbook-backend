import { replicateAdminAuth, replicateOrgAuth } from "../../../utils/replacate.utils";
import { getAllOrganisations } from "../../data/organisationData";
import { QueryResolvers, Organisation } from "../../generated";

const organisationQueries: QueryResolvers = {
  // Get Organisation by loginUserId
  organisation: async (_, { id }, { loaders, auth, prisma }) => {
    const loginUserId = await replicateOrgAuth(auth, id, prisma)
    const query = await loaders.organisation.one(loginUserId);
    return query as Organisation;
  },
  // Get all Organisation
  organisations: async (_, _args, { auth }) => {
    replicateAdminAuth(auth)
    const query = await getAllOrganisations();
    return query as Array<Organisation>;
  },
};

export default organisationQueries;
