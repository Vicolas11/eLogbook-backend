"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const ENV = process.env.NODE_ENV || "development";
exports.envConfig = {
    url: process.env.BASE_URL,
    default_img: process.env.DEFAULT_IMG,
    port: +process.env.APP_PORT || 8080,
    dev: ENV === "development",
    prod: ENV === "production",
    test: ENV === "test",
};
//# sourceMappingURL=env.config.js.map