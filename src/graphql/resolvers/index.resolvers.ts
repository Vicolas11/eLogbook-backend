import { resolvers as scalarResolvers } from "graphql-scalars";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import studentMutations from "./student/mutations";
import studentQueries from "./student/queries";
import uploadFileMutation from "./uploadfile";
import { Resolvers } from "../generated";

const resolvers: Resolvers = {
  ...scalarResolvers,
  Query: {
    ...studentQueries,
  },
  Upload: GraphQLUpload,
  Mutation: {
    ...uploadFileMutation,
    ...studentMutations,
  },
};

export default resolvers;
