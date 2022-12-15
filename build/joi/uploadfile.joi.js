"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDelInputSchema = exports.FileUpdateInputSchema = exports.FileInputSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.FileInputSchema = joi_1.default.object({
    file: joi_1.default.any(),
    type: joi_1.default.string()
        .valid("logo", "chats", "avatar", "diagrams", "blogposts")
        .required(),
});
exports.FileUpdateInputSchema = joi_1.default.object({
    id: joi_1.default.string().min(36).required(),
    actId: joi_1.default.string().length(13),
    file: joi_1.default.any(),
    type: joi_1.default.string()
        .valid("logo", "chats", "avatar", "diagrams", "blogposts")
        .required(),
});
exports.FileDelInputSchema = joi_1.default.object({
    id: joi_1.default.string().min(36).required(),
    actId: joi_1.default.string().length(13),
    type: joi_1.default.string().valid("logo", "chats", "avatar", "diagrams", "blogposts"),
});
//# sourceMappingURL=uploadfile.joi.js.map