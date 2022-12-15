"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelBlogPostInputSchema = exports.BlogPostInputSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.BlogPostInputSchema = joi_1.default.object({
    title: joi_1.default.string().min(5).required(),
    content: joi_1.default.string().min(30).required(),
    image: joi_1.default.string().min(38).regex(/[.jpg]$/),
});
exports.DelBlogPostInputSchema = joi_1.default.object({
    email: joi_1.default.string().min(5).email().required(),
});
//# sourceMappingURL=blogpost.joi.js.map