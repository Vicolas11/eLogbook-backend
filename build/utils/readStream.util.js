"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const genfilename_utils_1 = __importDefault(require("./genfilename.utils"));
const apollo_server_express_1 = require("apollo-server-express");
const env_config_1 = require("../configs/env.config");
const checkfile_util_1 = __importDefault(require("./checkfile.util"));
const fs_1 = require("fs");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const fileremove_util_1 = __importDefault(require("./fileremove.util"));
(0, dotenv_1.config)();
const readStreamFile = async (args) => {
    const { file, action, subpath, oldImgURL } = args;
    const { port, dev, url } = env_config_1.envConfig;
    const { createReadStream, mimetype: t } = await file;
    // Check ImageType
    if (t !== "image/jpeg" && t !== "image/png" && t !== "image/jpg") {
        throw new apollo_server_express_1.UserInputError("Invalid image file uploaded!");
    }
    // Check File size is not more than 1MB
    try {
        const oneMB = 1000000; // 1MB
        await (0, checkfile_util_1.default)(createReadStream, oneMB);
    }
    catch (error) {
        if (typeof error === "number") {
            throw new apollo_server_express_1.UserInputError("Maximum file size is 1MB!");
        }
    }
    const stream = createReadStream();
    const unqueFilename = (0, genfilename_utils_1.default)(subpath);
    const pathname = (0, path_1.join)(__dirname, `../../public/upload/${subpath}/${unqueFilename}`);
    let URL = "";
    // DELETE AND UPDATE USER IMAGE
    if (action === "update" && oldImgURL !== "") {
        const imgURL = oldImgURL === null || oldImgURL === void 0 ? void 0 : oldImgURL.split("/");
        const lastIdx = (imgURL === null || imgURL === void 0 ? void 0 : imgURL.length) - 1;
        const filepath = imgURL[lastIdx];
        const isRemoved = await (0, fileremove_util_1.default)({ filepath, subpath });
        // If file is successfully deleted, then update!
        if (isRemoved) {
            const UPDATED_URL = `/${subpath}/${unqueFilename}`;
            const imageStream = (0, fs_1.createWriteStream)(pathname);
            stream.pipe(imageStream);
            URL = UPDATED_URL;
        }
    }
    else {
        const CREATED_URL = `/${subpath}/${unqueFilename}`;
        const imageStream = (0, fs_1.createWriteStream)(pathname);
        stream.pipe(imageStream);
        URL = CREATED_URL;
    }
    return URL;
};
exports.default = readStreamFile;
//# sourceMappingURL=readStream.util.js.map