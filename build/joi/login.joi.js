"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginInputSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.LoginInputSchema = joi_1.default.object({
    email: joi_1.default.string().min(5).email().required(),
    password: joi_1.default.string().min(6).required(),
});
//# sourceMappingURL=login.joi.js.map