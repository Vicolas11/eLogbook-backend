"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const constant_config_1 = require("../configs/constant.config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUser = (token) => {
    const { secretKey } = constant_config_1.constant;
    let id = "";
    let email = "";
    let role = "";
    if (!token || token === "")
        throw new apollo_server_express_1.AuthenticationError("Not tokenentication!");
    try {
        const decode = jsonwebtoken_1.default.verify(token, secretKey);
        id = decode.id && decode.id;
        email = decode.email && decode.email;
        role = decode.role && decode.role;
    }
    catch (err) {
        throw new apollo_server_express_1.AuthenticationError(`${err}`);
    }
    return {
        id,
        email,
        role,
    };
};
exports.default = getUser;
//# sourceMappingURL=getuser.util.js.map