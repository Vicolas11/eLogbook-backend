"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const env_config_1 = require("../configs/env.config");
(0, dotenv_1.config)();
const handleDevError = (err, _, res) => {
    return res.json({});
};
const errorHandler = (err, _, res, next) => {
    const { dev, prod } = env_config_1.envConfig;
    if (dev) {
    }
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map