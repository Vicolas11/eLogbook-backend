"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constant_config_1 = require("../configs/constant.config");
const crypto_js_1 = __importDefault(require("crypto-js"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const JWTokenCipher = (JWToken) => {
    const { cipherSecretKey } = constant_config_1.constant;
    // Encrypt
    var ciphertext = crypto_js_1.default.AES.encrypt(JWToken, cipherSecretKey).toString();
    // Decrypt
    var bytes = crypto_js_1.default.AES.decrypt(ciphertext, cipherSecretKey);
    var originalToken = bytes.toString(crypto_js_1.default.enc.Utf8);
    return originalToken;
};
exports.default = JWTokenCipher;
//# sourceMappingURL=cipher.util.js.map