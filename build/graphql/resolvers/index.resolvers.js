"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_scalars_1 = require("graphql-scalars");
const mutations_1 = __importDefault(require("./organisation/mutations"));
const GraphQLUpload_js_1 = __importDefault(require("graphql-upload/GraphQLUpload.js"));
const mutations_2 = __importDefault(require("./coordinator/mutations"));
const mutations_3 = __importDefault(require("./supervisor/mutations"));
const queries_1 = __importDefault(require("./organisation/queries"));
const queries_2 = __importDefault(require("./coordinator/queries"));
const queries_3 = __importDefault(require("./supervisor/queries"));
const mutations_4 = __importDefault(require("./blogpost/mutations"));
const mutations_5 = __importDefault(require("./eligible/mutations"));
const organisation_1 = __importDefault(require("./login/organisation"));
const coordinator_1 = __importDefault(require("./login/coordinator"));
const mutations_6 = __importDefault(require("./student/mutations"));
const mutations_7 = __importDefault(require("./logbook/mutations"));
const changepassword_1 = __importDefault(require("./changepassword"));
const queries_4 = __importDefault(require("./blogpost/queries"));
const queries_5 = __importDefault(require("./eligible/queries"));
const supervisor_1 = __importDefault(require("./login/supervisor"));
const queries_6 = __importDefault(require("./student/queries"));
const uploadfile_1 = __importDefault(require("./uploadfile"));
const student_1 = __importDefault(require("./login/student"));
const resolvers = {
    ...graphql_scalars_1.resolvers,
    Query: {
        ...queries_6.default,
        ...queries_3.default,
        ...queries_2.default,
        ...queries_1.default,
        ...queries_4.default,
        ...queries_5.default,
        ...student_1.default,
        ...supervisor_1.default,
        ...coordinator_1.default,
        ...organisation_1.default,
    },
    Upload: GraphQLUpload_js_1.default,
    Mutation: {
        ...changepassword_1.default,
        ...uploadfile_1.default,
        ...mutations_6.default,
        ...mutations_3.default,
        ...mutations_2.default,
        ...mutations_1.default,
        ...mutations_4.default,
        ...mutations_5.default,
        ...mutations_7.default,
    },
};
exports.default = resolvers;
//# sourceMappingURL=index.resolvers.js.map