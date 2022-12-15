"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePswInputSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.changePswInputSchema = joi_1.default.object({
    id: joi_1.default.string().min(36),
    password: joi_1.default.string().min(6).required(),
    new_password: joi_1.default.string().min(6).required(),
    con_password: joi_1.default.valid(joi_1.default.ref("new_password")).messages({
        "any.only": "New and Confirm Passwords Must Match!",
    }),
});
//# sourceMappingURL=password.joi.js.map