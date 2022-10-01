import { resolvers as scalarResolvers } from "graphql-scalars";
import organisationMutations from "./organisation/mutations";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import coordinatorMutations from "./coordinator/mutations";
import supervisorMutations from "./supervisor/mutations";
import organisationQueries from "./organisation/queries";
import coordinatorQueries from "./coordinator/queries";
import supervisorQueries from "./supervisor/queries";
import blogPostMutations from "./blogpost/mutations";
import eligibleMutations from "./eligible/mutations";
import studentMutations from "./student/mutations";
import changePswMutation from "./changepassword";
import blogPostQueries from "./blogpost/queries";
import eligibleQueries from "./eligible/queries";
import studentQueries from "./student/queries";
import uploadFileMutation from "./uploadfile";
import studentLogin from "./login/student";
import { Resolvers } from "../generated";

const resolvers: Resolvers = {
  ...scalarResolvers,
  Query: {
    ...studentQueries,
    ...supervisorQueries,
    ...coordinatorQueries,
    ...organisationQueries,
    ...blogPostQueries,
    ...eligibleQueries,
    ...studentLogin,
  },
  Upload: GraphQLUpload,
  Mutation: {
    ...changePswMutation,
    ...uploadFileMutation,
    ...studentMutations,
    ...supervisorMutations,
    ...coordinatorMutations,
    ...organisationMutations,
    ...blogPostMutations,
    ...eligibleMutations,
  },
};

export default resolvers;
