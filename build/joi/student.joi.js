"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelStudentInputSchema = exports.UpdateStudentInputSchema = exports.StudentInputSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.StudentInputSchema = joi_1.default.object({
    firstName: joi_1.default.string().min(3).max(50).required(),
    lastName: joi_1.default.string().min(3).max(50).required(),
    matricNo: joi_1.default.string().min(3).max(50).required(),
    phone: joi_1.default.string().min(5).required(),
    address: joi_1.default.string().min(10).required(),
    institute: joi_1.default.string().required(),
    department: joi_1.default.string().required(),
    level: joi_1.default.string().valid("ND1", "NC2", "L3", "L4"),
    gender: joi_1.default.string().valid("Male", "Female"),
    place: joi_1.default.string().email().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    avatar: joi_1.default.string().min(30).regex(/[.jpg]$/).required(),
});
exports.UpdateStudentInputSchema = joi_1.default.object({
    firstName: joi_1.default.string().min(3).max(50).required(),
    lastName: joi_1.default.string().min(3).max(50).required(),
    phone: joi_1.default.string().min(5).required(),
    email: joi_1.default.string().email(),
    address: joi_1.default.string().min(10),
    level: joi_1.default.string().valid("ND1", "NC2", "L3", "L4"),
    gender: joi_1.default.string().valid("Male", "Female"),
    avatar: joi_1.default.string().min(30).regex(/[.jpg]$/).required(),
});
exports.DelStudentInputSchema = joi_1.default.object({
    email: joi_1.default.string().min(5).email().required(),
});
//# sourceMappingURL=student.joi.js.map