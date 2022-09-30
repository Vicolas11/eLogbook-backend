import { getAllOrganisations } from "../../data/organisationData";
import { QueryResolvers, Organisation } from "../../generated";

const organisationQueries: QueryResolvers = {
  organisation: async (_, { id }, { loaders }) => {
    const query = await loaders.organisation.one(id);
    return query as Organisation;
  },
  
  organisations: async () => {
    const query = await getAllOrganisations();
    return query as Array<Organisation>;
  },
};

export default organisationQueries;
