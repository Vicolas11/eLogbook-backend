"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelCoordinatorInputSchema = exports.UpdateCoordinatorInputSchema = exports.CoordinatorInputSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// SUPERVISOR AND COORDINATOR HAVE THE SAME FIELDS SO NO NEED TO CREATE FOR SUPERVISOR
exports.CoordinatorInputSchema = joi_1.default.object({
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
exports.UpdateCoordinatorInputSchema = joi_1.default.object({
    title: joi_1.default.string().valid("Prof", "Dr", "Mr", "Mrs", "Miss"),
    firstName: joi_1.default.string().min(3).max(50).required(),
    lastName: joi_1.default.string().min(3).max(50).required(),
    email: joi_1.default.string().min(5).email().required(),
    phone: joi_1.default.string().min(5),
    gender: joi_1.default.string().valid("Male", "Female"),
    avatar: joi_1.default.string().min(30).regex(/[.jpg]$/),
});
exports.DelCoordinatorInputSchema = joi_1.default.object({
    email: joi_1.default.string().min(5).email().required(),
});
//# sourceMappingURL=coordinator.joi.js.map