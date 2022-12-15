"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const fileRemover = async (args) => {
    const { filepath, subpath } = args;
    return new Promise((resolve, reject) => {
        try {
            const path = (0, path_1.join)(__dirname, "../..", "public/upload", subpath, filepath);
            (0, fs_1.unlink)(path, (err) => {
                if (err)
                    reject(err);
                resolve(true);
            });
        }
        catch (err) {
            const error = Error(`Error occurred while deleting! ${err}`);
            error["statusCode"] = 400;
            throw error;
        }
    });
};
exports.default = fileRemover;
//# sourceMappingURL=fileremove.util.js.map