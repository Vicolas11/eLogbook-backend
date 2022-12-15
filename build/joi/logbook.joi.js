"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelLogbookInputSchema = exports.UpdateLogbookInputSchema = exports.LogbookInputSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.LogbookInputSchema = joi_1.default.object({
    day: joi_1.default.date().required(),
    actId: joi_1.default.string().length(13),
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    label: joi_1.default.string().valid("indigo", "gray", "green", "blue", "red").required(),
    diagram: joi_1.default.string().min(30).regex(/[.jpg]$/),
    email: joi_1.default.string().min(5).email().required(),
});
exports.UpdateLogbookInputSchema = joi_1.default.object({
    id: joi_1.default.string().min(5),
    actId: joi_1.default.string().length(13),
    day: joi_1.default.date().required(),
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    label: joi_1.default.string().valid("indigo", "gray", "green", "blue", "red").required(),
    diagram: joi_1.default.string().min(30).regex(/[.jpg]$/),
    email: joi_1.default.string().min(5).email().required()
});
exports.DelLogbookInputSchema = joi_1.default.object({
    id: joi_1.default.string().min(5),
    actId: joi_1.default.string().length(13).required(),
    email: joi_1.default.string().min(5).email().required()
});
//# sourceMappingURL=logbook.joi.js.map