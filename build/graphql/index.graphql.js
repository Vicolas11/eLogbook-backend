"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startApolloServer = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const graphqlUploadExpress_js_1 = __importDefault(require("graphql-upload/graphqlUploadExpress.js"));
const apollo_server_express_1 = require("apollo-server-express");
const env_config_1 = require("../configs/env.config");
const client_1 = require("@prisma/client");
const graphql_depth_limit_1 = __importDefault(require("graphql-depth-limit"));
const context_1 = __importDefault(require("./context"));
const schema_1 = __importDefault(require("./schema"));
const http_1 = __importDefault(require("http"));
const startApolloServer = async (app) => {
    // Test Prisma Connection
    const prisma = new client_1.PrismaClient();
    try {
        await prisma.$connect();
        console.log("\x1b[32m%s\x1b[0m", "😎 Prisma connected to database");
    }
    catch (err) {
        console.log("\x1b[31m%s\x1b[0m", "😔 Prisma failed to connect database");
    }
    const { port } = env_config_1.envConfig;
    const httpServer = http_1.default.createServer(app);
    const server = new apollo_server_express_1.ApolloServer({
        schema: schema_1.default,
        context: context_1.default,
        csrfPrevention: true,
        cache: "bounded",
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            (0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true }),
        ],
        validationRules: [(0, graphql_depth_limit_1.default)(5)]
    });
    // This middleware must come before ApplyMiddleware method below
    app.use((0, graphqlUploadExpress_js_1.default)());
    await server.start();
    server.applyMiddleware({ app, path: "/api/graphql" });
    // Throw unhandled rejection to a fallback handler
    process.on("unhandledRejection", (reason) => {
        console.log("\x1b[31m%s\x1b[0m", `Unhandled Rejection: ${reason}`);
        throw reason;
    });
    // Kill app if there's an uncaught exception
    process.on("uncaughtException", (error) => {
        console.log("\x1b[31m%s\x1b[0m", `UncaughtException Error: ${error}`);
        process.exit(1);
    });
    await new Promise((resolve) => httpServer.listen({ port: port }, resolve));
    console.log(`🚀 HTTP Server ready at http://localhost:${port}`);
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
};
exports.startApolloServer = startApolloServer;
//# sourceMappingURL=index.graphql.js.map