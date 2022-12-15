"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileremove_util_1 = __importDefault(require("./fileremove.util"));
const deleteFile = async (oldImgURL, subpath) => {
    // const subpath = avatar ? "avatar" : "diagram";
    const imgURL = oldImgURL.split("/");
    const lastIdx = imgURL.length - 1;
    const filepath = imgURL[lastIdx];
    const isRemoved = await (0, fileremove_util_1.default)({ filepath, subpath });
    if (isRemoved)
        return true;
};
exports.default = deleteFile;
//# sourceMappingURL=deletefile.utils.js.map