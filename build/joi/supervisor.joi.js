"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelSupervisorInputSchema = exports.UpdateSupervisorInputSchema = exports.SupervisorInputSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.SupervisorInputSchema = joi_1.default.object({
    title: joi_1.default.string().valid("Prof", "Dr", "Mr", "Mrs", "Miss"),
    firstName: joi_1.default.string().min(3).max(50).required(),
    lastName: joi_1.default.string().min(3).max(50).required(),
    staffID: joi_1.default.string().min(3).max(50).required(),
    phone: joi_1.default.string().min(5),
    institute: joi_1.default.string().required(),
    department: joi_1.default.string().required(),
    gender: joi_1.default.string().valid("Male", "Female"),
    email: joi_1.default.string().min(5).email().required(),
    password: joi_1.default.string().min(6).required(),
    avatar: joi_1.default.string().min(30).regex(/[.jpg]$/),
});
exports.UpdateSupervisorInputSchema = joi_1.default.object({
    title: joi_1.default.string().valid("Prof", "Dr", "Mr", "Mrs", "Miss"),
    firstName: joi_1.default.string().min(3).max(50).required(),
    lastName: joi_1.default.string().min(3).max(50).required(),
    phone: joi_1.default.string().min(5),
    email: joi_1.default.string().min(5).email().required(),
    gender: joi_1.default.string().valid("Male", "Female"),
    avatar: joi_1.default.string().min(30).regex(/[.jpg]$/),
});
exports.DelSupervisorInputSchema = joi_1.default.object({
    email: joi_1.default.string().min(5).email().required(),
});
//# sourceMappingURL=supervisor.joi.js.map