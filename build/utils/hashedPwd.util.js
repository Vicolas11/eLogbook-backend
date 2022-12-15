"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generatedSalt = () => {
    return new Promise((resolve, reject) => {
        bcryptjs_1.default.genSalt(12, (err, salt) => {
            if (err)
                reject(err);
            resolve(salt);
        });
    });
};
const hashPassword = async (password) => {
    const salt = await generatedSalt();
    return new Promise(async (resolve, reject) => {
        try {
            bcryptjs_1.default.hash(password, salt, (err, hash) => {
                if (err)
                    reject(err);
                resolve(hash);
            });
        }
        catch (err) {
            reject(err);
        }
    });
};
exports.hashPassword = hashPassword;
const validatePassword = async ({ pwd, hashPwd, }) => {
    const hasHashed = bcryptjs_1.default.compare(pwd, hashPwd);
    return hasHashed;
};
exports.validatePassword = validatePassword;
//# sourceMappingURL=hashedPwd.util.js.map