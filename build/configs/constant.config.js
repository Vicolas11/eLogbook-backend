"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constant = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.constant = {
    accessToken: process.env.ACCESS_TOKEN,
    refreshToken: process.env.REFRESH_TOKEN,
    secretKey: process.env.SECRET_KEY,
    cipherSecretKey: process.env.CIPHER_SECRET_KEY,
    cryptoSecretKey: process.env.CRYPTO_SECRET_KEY,
    expiresIn: "2h",
    refreshIn: "3d",
};
//# sourceMappingURL=constant.config.js.map