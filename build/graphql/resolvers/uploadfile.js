"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const uploadfile_joi_1 = require("../../joi/uploadfile.joi");
const readStream_util_1 = __importDefault(require("../../utils/readStream.util"));
const crypto_utils_1 = require("../../utils/crypto.utils");
const deletefile_utils_1 = __importDefault(require("../../utils/deletefile.utils"));
const env_config_1 = require("../../configs/env.config");
const getuser_util_1 = __importDefault(require("../../utils/getuser.util"));
const { default_img } = env_config_1.envConfig;
const uploadFileMutation = {
    // CREATE UPDATE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    uploadFile: async (_, { input }, _ctx) => {
        var _a;
        const { file, type } = input;
        // Validate Input field
        const validate = uploadfile_joi_1.FileInputSchema.validate(input);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Validation Error!");
        const getFile = await input.file;
        if (!getFile) {
            throw new apollo_server_express_1.UserInputError("Uploaded an empty file!");
        }
        const imageURL = await (0, readStream_util_1.default)({
            file: file,
            oldImgURL: "",
            action: "create",
            subpath: type,
        });
        return {
            message: "Successfully uploaded!",
            imageUrl: imageURL,
            status: 200,
        };
    },
    // UPDATE FILE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    updateFile: async (_, { updateInput: input }, { prisma, auth }) => {
        var _a;
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const user = (0, getuser_util_1.default)(token);
        const { id: loginUserId, role } = user;
        // Authenticate user
        if (!user || loginUserId === "" || role === "")
            throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
        const { file, id, type, actId } = input;
        // Validate Input field
        const validate = uploadfile_joi_1.FileUpdateInputSchema.validate(input);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Validation Error!");
        let userExist;
        let logbook;
        if (type === "diagrams") {
            // Update Logbook Diagram
            const studLogbook = await prisma.student.findUnique({
                where: { id: loginUserId },
                include: { logbooks: true },
            });
            logbook = studLogbook === null || studLogbook === void 0 ? void 0 : studLogbook.logbooks.find((i) => i.actId === actId);
        }
        else {
            // Update Users Avatar / Organisation Logo
            const loginUserRole = role.toLowerCase();
            userExist = await prisma[loginUserRole].findUnique({
                where: { id: loginUserId },
            });
            if (!userExist)
                throw new apollo_server_express_1.AuthenticationError("User doesn't exist!");
        }
        const getFile = await file;
        if (!getFile)
            throw new apollo_server_express_1.AuthenticationError("Uploaded an empty file!");
        if (loginUserId !== id)
            throw new apollo_server_express_1.AuthenticationError("Not authorized: Not a genuine user!");
        const imageURL = await (0, readStream_util_1.default)({
            file: file,
            oldImgURL: (userExist === null || userExist === void 0 ? void 0 : userExist.avatar) === default_img
                ? ""
                : (userExist === null || userExist === void 0 ? void 0 : userExist.avatar) || (userExist === null || userExist === void 0 ? void 0 : userExist.logo) || (logbook === null || logbook === void 0 ? void 0 : logbook.diagram),
            action: "update",
            subpath: type,
        });
        return {
            message: "Image successfuly updated!",
            imageUrl: imageURL,
            status: 200,
        };
    },
    // DELETE FILE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    deleteFile: async (_, { deleteInput }, { prisma, auth }) => {
        var _a;
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const user = (0, getuser_util_1.default)(token);
        const { id: loginUserId, role } = user;
        // Authenticate user
        if (!user || loginUserId === "" || role === "")
            throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
        const { id, type, actId } = deleteInput;
        // Validate Input field
        const validate = uploadfile_joi_1.FileDelInputSchema.validate(deleteInput);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Validation Error!");
        let userExist;
        let logbook;
        if (type === "diagrams") {
            // Delete Logbook Diagram
            const studLogbook = await prisma.student.findUnique({
                where: { id: loginUserId },
                include: { logbooks: true },
            });
            logbook = studLogbook === null || studLogbook === void 0 ? void 0 : studLogbook.logbooks.find((i) => i.actId === actId);
        }
        else {
            const loginUserRole = role.toLowerCase();
            const userExist = await prisma[loginUserRole].findUnique({
                where: { id: loginUserId },
            });
            if (!userExist)
                throw new apollo_server_express_1.AuthenticationError("User doesn't exist!");
        }
        // Authorized user, if is Genuine
        if (loginUserId !== id)
            throw new apollo_server_express_1.AuthenticationError("Not authorized: Not a genuine user!");
        let status = 500;
        let message = "";
        let subpath = "";
        if (userExist === null || userExist === void 0 ? void 0 : userExist.avatar) {
            subpath = "avatar";
        }
        else if (userExist === null || userExist === void 0 ? void 0 : userExist.logo) {
            subpath = "logo";
        }
        else if (logbook === null || logbook === void 0 ? void 0 : logbook.diagram) {
            subpath = "diagrams";
        }
        if ((userExist === null || userExist === void 0 ? void 0 : userExist.avatar) !== default_img || (logbook === null || logbook === void 0 ? void 0 : logbook.diagram)) {
            const isDeleted = await (0, deletefile_utils_1.default)((userExist === null || userExist === void 0 ? void 0 : userExist.avatar) || (userExist === null || userExist === void 0 ? void 0 : userExist.logo) || (logbook === null || logbook === void 0 ? void 0 : logbook.diagram), subpath);
            message = isDeleted
                ? "Image successfuly deleted!"
                : "Image deleting failed!";
            status = isDeleted ? 200 : 500;
        }
        return {
            message: (userExist === null || userExist === void 0 ? void 0 : userExist.avatar) === default_img || !(logbook === null || logbook === void 0 ? void 0 : logbook.diagram) ? "Successful" : message,
            imageUrl: (userExist === null || userExist === void 0 ? void 0 : userExist.avatar) || (userExist === null || userExist === void 0 ? void 0 : userExist.logo) || (logbook === null || logbook === void 0 ? void 0 : logbook.diagram),
            status: (userExist === null || userExist === void 0 ? void 0 : userExist.avatar) === default_img || !(logbook === null || logbook === void 0 ? void 0 : logbook.diagram) ? 200 : status,
            actId
        };
    },
};
exports.default = uploadFileMutation;
//# sourceMappingURL=uploadfile.js.map