"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptToken = exports.encryptToken = void 0;
const constant_config_1 = require("../configs/constant.config");
const simple_crypto_js_1 = __importDefault(require("simple-crypto-js"));
const dotenv_1 = require("dotenv");
const apollo_server_express_1 = require("apollo-server-express");
(0, dotenv_1.config)();
const { cryptoSecretKey } = constant_config_1.constant;
const simpleCrypto = new simple_crypto_js_1.default(cryptoSecretKey);
const encryptToken = (token) => {
    const cipherText = simpleCrypto.encrypt(token);
    return cipherText;
};
exports.encryptToken = encryptToken;
const decryptToken = (auth) => {
    if (!auth || auth === "")
        throw new apollo_server_express_1.AuthenticationError("Not authentication!");
    const bearer = auth.split(" ")[0];
    const cipherText = auth.split(" ")[1];
    if ((bearer !== "Bearer" && bearer !== "Token") || cipherText === "")
        throw new apollo_server_express_1.AuthenticationError("Not authentication!");
    const token = simpleCrypto.decrypt(cipherText);
    return token;
};
exports.decryptToken = decryptToken;
//# sourceMappingURL=crypto.utils.js.map