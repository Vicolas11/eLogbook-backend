import { typeDefs as scalarsTypeDefs } from "graphql-scalars";
import { makeExecutableSchema } from "@graphql-tools/schema"
import { loadFilesSync } from "@graphql-tools/load-files";
import { resolvers } from "./resolvers/index.resolvers";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { join } from "path";

const path = join(__dirname, './typedefs');

const typeDefsArray: string[] = loadFilesSync(`${path}/**/*.graphql`);

const typeDefs = mergeTypeDefs([...typeDefsArray, ...scalarsTypeDefs]);

const schema = makeExecutableSchema({ typeDefs, resolvers});

export default schema;