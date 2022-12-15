"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_scalars_1 = require("graphql-scalars");
const schema_1 = require("@graphql-tools/schema");
const load_files_1 = require("@graphql-tools/load-files");
const merge_1 = require("@graphql-tools/merge");
const index_resolvers_1 = __importDefault(require("./resolvers/index.resolvers"));
const path_1 = require("path");
const path = (0, path_1.join)(__dirname, './typedefs');
const typeDefsArray = (0, load_files_1.loadFilesSync)(`${path}/**/*.graphql`);
// Merge all the .graphql files into an Array
const typeDefs = (0, merge_1.mergeTypeDefs)([...typeDefsArray, ...graphql_scalars_1.typeDefs]);
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs, resolvers: index_resolvers_1.default });
// console.log(schema)
exports.default = schema;
//# sourceMappingURL=schema.js.map