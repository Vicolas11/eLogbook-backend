"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelEligibleInputSchema = exports.UpdateEligibleInputSchema = exports.EligibleInputSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.EligibleInputSchema = joi_1.default.object({
    level: joi_1.default.string().valid("ND1", "NC2", "L3", "L4").required(),
    matricNo: joi_1.default.string()
        .min(5)
        .regex(/^([A-Z0-9]+){8}((,\s)([A-Z0-9]+){7})*([A-Z0-9]+)$/)
        .required().uppercase(),
    email: joi_1.default.string().email().required(),
});
exports.UpdateEligibleInputSchema = joi_1.default.object({
    id: joi_1.default.string().min(5).required(),
    level: joi_1.default.string().valid("ND1", "NC2", "L3", "L4").required(),
    email: joi_1.default.string().email().required()
});
exports.DelEligibleInputSchema = joi_1.default.object({
    id: joi_1.default.string().min(5).required(),
});
//# sourceMappingURL=eligible.joi.js.map