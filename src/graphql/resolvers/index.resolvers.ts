import { resolvers as scalarResolvers } from "graphql-scalars";
import organisationMutations from "./organisation/mutations";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import coordinatorMutations from "./coordinator/mutations";
import supervisorMutations from "./supervisor/mutations";
import organisationQueries from "./organisation/queries";
import coordinatorQueries from "./coordinator/queries";
import supervisorQueries from "./supervisor/queries";
import studentMutations from "./student/mutations";
import changePswMutation from "./changepassword";
import studentQueries from "./student/queries";
import uploadFileMutation from "./uploadfile";
import { Resolvers } from "../generated";

const resolvers: Resolvers = {
  ...scalarResolvers,
  Query: {
    ...studentQueries,
    ...supervisorQueries,
    ...coordinatorQueries,
    ...organisationQueries,
  },
  Upload: GraphQLUpload,
  Mutation: {
    ...changePswMutation,
    ...uploadFileMutation,
    ...studentMutations,
    ...supervisorMutations,
    ...coordinatorMutations,
    ...organisationMutations,
  },
};

export default resolvers;
