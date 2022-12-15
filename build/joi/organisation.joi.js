"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelOrganisationInputSchema = exports.UpdateOrganisationInputSchema = exports.OrganisationInputSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.OrganisationInputSchema = joi_1.default.object({
    name: joi_1.default.string().min(5).max(150).required(),
    sector: joi_1.default.string().valid("ICT", "Healthcare", "Agriculture", "Transportation", "Energy", "Commercial", "Financial", "Aviation", "Construction", "Manufacturing", "Education", "Fashion", "Logistics", "Tourism", "Telecommunication", "Entertainment", "Legal", "Consultancy", "Religion", "Oil", "Others").required(),
    phone: joi_1.default.string().min(5).max(18),
    address: joi_1.default.string().min(10).required(),
    employees: joi_1.default.number(),
    email: joi_1.default.string().min(5).email().required(),
    password: joi_1.default.string().min(6).required(),
    logo: joi_1.default.string().min(30).regex(/[.jpg]$/).required(),
});
exports.UpdateOrganisationInputSchema = joi_1.default.object({
    email: joi_1.default.string().min(5).email().required(),
    name: joi_1.default.string().min(5).max(150).required(),
    sector: joi_1.default.string().valid("ICT", "Healthcare", "Agriculture", "Transportation", "Energy", "Commercial", "Financial", "Aviation", "Construction", "Manufacturing", "Education", "Fashion", "Logistics", "Tourism", "Telecommunication", "Entertainment", "Legal", "Consultancy", "Religion", "Oil", "Others").required(),
    phone: joi_1.default.string().min(5).max(18),
    address: joi_1.default.string().min(10).required(),
    employees: joi_1.default.number(),
    logo: joi_1.default.string().min(30).regex(/[.jpg]$/).required(),
});
exports.DelOrganisationInputSchema = joi_1.default.object({
    email: joi_1.default.string().min(5).email().required(),
});
//# sourceMappingURL=organisation.joi.js.map