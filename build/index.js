"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_graphql_1 = require("./graphql/index.graphql");
const env_config_1 = require("./configs/env.config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = require("path");
const cors_1 = __importDefault(require("cors"));
(async () => {
    // Initialized Express Application
    const app = (0, express_1.default)();
    // Prevent Cross-site Scripting Attack
    app.use((0, xss_clean_1.default)());
    // Enables Cross-Origin Resource Sharing for various methods(POST,GET,DELETE...)
    app.use((0, cors_1.default)());
    // Parses incoming requests with JSON payloads
    app.use(express_1.default.json({ limit: "1MB" }));
    // Parses incoming requests with urlencoded payloads
    app.use(express_1.default.urlencoded({ extended: true }));
    // Parse and display static path
    app.use(express_1.default.static((0, path_1.join)(__dirname, "../public/upload/")));
    app.use("/diagrams", express_1.default.static((0, path_1.join)(__dirname, "diagrams")));
    app.use("/avatar", express_1.default.static((0, path_1.join)(__dirname, "avatar")));
    app.use("/chats", express_1.default.static((0, path_1.join)(__dirname, "chats")));
    app.use("/blog", express_1.default.static((0, path_1.join)(__dirname, "blog")));
    app.use("/logo", express_1.default.static((0, path_1.join)(__dirname, "logo")));
    // Compress response bodies for every request
    app.use((0, compression_1.default)());
    // Parse Cookies
    app.use((0, cookie_parser_1.default)());
    // Add secure HTTP headers
    app.use((0, helmet_1.default)({
        crossOriginEmbedderPolicy: !env_config_1.envConfig.dev,
        contentSecurityPolicy: !env_config_1.envConfig.dev,
    }));
    app.get("/", (_req, res) => {
        res.send('<h1 style="text-align: center;">Server is Ready 👌!</h1>');
    });
    // Start Apollo Server
    (0, index_graphql_1.startApolloServer)(app);
})();
//# sourceMappingURL=index.js.map