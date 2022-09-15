import { makeExecutableSchema } from "@graphql-tools/schema"
import { resolvers } from "./resolvers/index.resolvers";
import { mergeTypeDefs } from "@graphql-tools/merge";

const typeDefs = mergeTypeDefs([]);

const schema = makeExecutableSchema({ typeDefs, resolvers});

export default schema;