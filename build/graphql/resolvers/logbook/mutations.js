"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logbook_joi_1 = require("../../../joi/logbook.joi");
const apollo_server_express_1 = require("apollo-server-express");
const crypto_utils_1 = require("../../../utils/crypto.utils");
const getuser_util_1 = __importDefault(require("../../../utils/getuser.util"));
const uuid_1 = require("uuid");
const logbookMutations = {
    // CREATE LOGBOOK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    logbook: async (_, { input }, { prisma, auth }) => {
        var _a;
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const user = (0, getuser_util_1.default)(token);
        const { email: loginUserEmail, role } = user;
        // Authenticate user
        if (!user || loginUserEmail === '' || role === '')
            throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
        // Authorize the user to be either a Student or an Admin
        if (role !== 'Student' && role !== 'Admin')
            throw new apollo_server_express_1.AuthenticationError("Not authorized!");
        const { email, day, title, description, diagram, label, actId } = input;
        // Input Validation
        const validate = logbook_joi_1.LogbookInputSchema.validate(input);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Validation Error!");
        // Validate if Student Logbook with same Day and Title existed
        const studLogbook = await prisma.logbook.findFirst({
            where: { AND: [{ day }, { title }], student: { email } },
        });
        if (studLogbook)
            throw new apollo_server_express_1.AuthenticationError("Logbook with this Day and Title already exist!");
        // Validate if the Logbook associated Student Exist
        const student = await prisma.student.findUnique({
            where: { email },
        });
        if (!student)
            throw new apollo_server_express_1.AuthenticationError("Logbook associated student doesn't exist!");
        // Authorized if user is genuine
        if (loginUserEmail !== email)
            throw new apollo_server_express_1.AuthenticationError("Not authorize: Not genuine user!");
        // Create Logbook and connect to the Login Student
        const inputData = { id: (0, uuid_1.v4)(), day, title, description, diagram, label, actId };
        const logbook = await prisma.logbook.create({
            data: {
                ...inputData,
                student: {
                    connect: { email: loginUserEmail },
                },
            },
            include: {
                student: true,
            },
        });
        return {
            status: 201,
            message: "Logbook created and connected successfully!",
            logbook,
        };
    },
    // UPDATE LOGBOOK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    updateLogbook: async (_, { input }, { prisma, auth }) => {
        var _a;
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const user = (0, getuser_util_1.default)(token);
        const { email: loginUserEmail, role } = user;
        // Authenticate user
        if (!user || loginUserEmail === '' || role === '')
            throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
        // Authorize the user to be either a Student or an Admin
        if (role !== 'Student' && role !== 'Admin')
            throw new apollo_server_express_1.AuthenticationError("Not authorized!");
        const { id, email, day, title, description, diagram, label, actId } = input;
        // Input Validation
        const validate = logbook_joi_1.UpdateLogbookInputSchema.validate(input);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Validation Error!");
        // Validate if Student Logbook with same Day and Title existed
        const studLogbook = await prisma.logbook.findFirst({
            where: { AND: [{ day }, { title }], student: { email } },
        });
        if (studLogbook)
            throw new apollo_server_express_1.AuthenticationError("Logbook with this Day and Title already existed!");
        // Validate if the Logbook associated Student Exist
        const student = await prisma.student.findUnique({
            where: { email },
        });
        if (!student)
            throw new apollo_server_express_1.AuthenticationError("Logbook associated student doesn't exist!");
        // Authorize if the user if genuine
        if (loginUserEmail !== email)
            throw new apollo_server_express_1.AuthenticationError("Not authenticated: Not genuine user!");
        // Update Logbook and connect to the Login Student
        const inputData = { title, description, diagram, label };
        const logbook = await prisma.logbook.update({
            where: { actId },
            data: {
                ...inputData,
                student: {
                    connect: { email },
                },
            },
            include: {
                student: true,
            },
        });
        return {
            status: 201,
            message: "Logbook updated and connected successfully!",
            logbook,
        };
    },
    // DELETE LOGBOOK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    deleteLogbook: async (_, { input }, { prisma, auth }) => {
        var _a;
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const user = (0, getuser_util_1.default)(token);
        const { email: loginUserEmail, role } = user;
        // Authenticate user
        if (!user || loginUserEmail === '' || role === '')
            throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
        // Authorize the user to be either a Student or an Admin
        if (role !== 'Student' && role !== 'Admin')
            throw new apollo_server_express_1.AuthenticationError("Not authorized!");
        const { email: studentEmail, actId } = input;
        // Input Validation
        const validate = logbook_joi_1.DelLogbookInputSchema.validate(input);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Validation Error!");
        // Authorize if the user if genuine
        if (loginUserEmail !== studentEmail)
            throw new apollo_server_express_1.AuthenticationError("Not authenticated: Not genuine user!");
        // Validate if Logbook exist
        const studLogbook = await prisma.logbook.findFirst({
            where: {
                actId,
                student: { email: studentEmail },
            },
        });
        if (!studLogbook)
            throw new apollo_server_express_1.AuthenticationError("Logbook associated student doesn't exist!");
        // Validate if the Logbook associated Student Exist
        const student = await prisma.student.findUnique({
            where: { email: studentEmail },
        });
        if (!student)
            throw new apollo_server_express_1.AuthenticationError("Logbook associated student doesn't exist!");
        // Delete the connected Student Logbook
        const logbook = await prisma.logbook.delete({ where: { actId } });
        return {
            status: 200,
            message: "Deleted logbook successfully!",
            logbook,
        };
    },
};
exports.default = logbookMutations;
//# sourceMappingURL=mutations.js.map