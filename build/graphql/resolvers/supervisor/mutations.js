"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supervisor_joi_1 = require("../../../joi/supervisor.joi");
const jwt_util_1 = require("../../../utils/jwt.util");
const apollo_server_express_1 = require("apollo-server-express");
const crypto_utils_1 = require("../../../utils/crypto.utils");
const hashedPwd_util_1 = require("../../../utils/hashedPwd.util");
const titlecase_utl_1 = __importDefault(require("../../../utils/titlecase.utl"));
const getuser_util_1 = __importDefault(require("../../../utils/getuser.util"));
const uuid_1 = require("uuid");
const supervisorMutations = {
    // CREATE SUPERVISOR USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    supervisor: async (_, { registerInput: input }, { prisma }) => {
        var _a;
        const { email, institute, department, firstName, lastName, staffID } = input;
        // Validate Input field
        const validate = supervisor_joi_1.SupervisorInputSchema.validate(input);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Validation Error!");
        // Check if Email Already Exist
        const supervisorExist = await prisma.supervisor.findUnique({
            where: { email },
        });
        if (supervisorExist)
            throw new apollo_server_express_1.AuthenticationError("Supervisor already existed!");
        // Get the Coordinator in a department of a school
        const coordinator = await prisma.coordinator.findFirst({
            where: {
                AND: [{ institute }, { department }],
            },
        });
        if (!coordinator)
            throw new apollo_server_express_1.AuthenticationError("Sorry, No exiting coordinator yet. Please contact your school coordinator!");
        const cooordinatorId = coordinator === null || coordinator === void 0 ? void 0 : coordinator.id;
        // Hashed and Replaced Password Input
        const hashPwd = await (0, hashedPwd_util_1.hashPassword)(input.password);
        input.password = hashPwd;
        input.firstName = (0, titlecase_utl_1.default)(firstName);
        input.lastName = (0, titlecase_utl_1.default)(lastName);
        input.staffID = staffID.toUpperCase();
        input.institute = (0, titlecase_utl_1.default)(institute);
        input.department = (0, titlecase_utl_1.default)(department);
        input.email = email.toLowerCase();
        // Create New Supervisor User
        const supervisorData = {
            ...input,
            id: (0, uuid_1.v4)(),
        };
        const newSupervisor = await prisma.supervisor.create({
            data: {
                ...supervisorData,
                coordinator: {
                    connect: {
                        id: cooordinatorId,
                    },
                },
            },
        });
        // Remove the password field for security reasons
        Reflect.deleteProperty(newSupervisor, "password");
        // Generate Access and Refreshed Token
        const accessToken = await (0, jwt_util_1.signAccessJWToken)({
            id: newSupervisor.id,
            email: newSupervisor.email,
            role: newSupervisor.user,
        });
        const refreshToken = await (0, jwt_util_1.signRefreshJWToken)({
            id: newSupervisor.id,
            email: newSupervisor.email,
            role: newSupervisor.user,
        });
        const encryptAccessToken = (0, crypto_utils_1.encryptToken)(accessToken);
        const encryptRefreshToken = (0, crypto_utils_1.encryptToken)(refreshToken);
        return {
            status: 201,
            message: "Created supervisor successfully!",
            accessToken: encryptAccessToken,
            refreshToken: encryptRefreshToken,
            supervisor: newSupervisor,
        };
    },
    // UPDATE SUPERVISOR USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    updateSupervisor: async (_, { updateInput: input }, { prisma, auth }) => {
        var _a;
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const user = (0, getuser_util_1.default)(token);
        const { email: loginUserEmail, role } = user;
        // Authenticate user
        if (!user || loginUserEmail === '' || role === '')
            throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
        // Authorize the user to be either a Supervisor or an Admin
        if (role !== 'Supervisor' && role !== 'Admin')
            throw new apollo_server_express_1.AuthenticationError("Not authorized!");
        const { title, email, firstName, lastName, phone, gender, avatar } = input;
        // Validate Input field
        const validate = supervisor_joi_1.UpdateSupervisorInputSchema.validate(input);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Validation Error!");
        // Check if Supervisor Already Exist
        const supervisorExist = await prisma.supervisor.findUnique({
            where: { email },
        });
        if (!supervisorExist)
            throw new apollo_server_express_1.AuthenticationError("Supervisor doesn't exist!");
        // Authorized Genuine Login User
        if (loginUserEmail !== email)
            throw new apollo_server_express_1.AuthenticationError("Not authorized: not a genuine user!");
        // Ensure field is in Title Case
        input.firstName = (0, titlecase_utl_1.default)(firstName);
        input.lastName = (0, titlecase_utl_1.default)(lastName);
        // Update Supervisor User
        const data = {
            title,
            firstName,
            lastName,
            phone,
            gender,
            avatar,
        };
        const updatedSupervisor = await prisma.supervisor.update({
            where: { email: loginUserEmail },
            data,
        });
        // Generate Access and Refreshed Token
        const accessToken = await (0, jwt_util_1.signAccessJWToken)({
            id: updatedSupervisor.id,
            email: updatedSupervisor.email,
            role: updatedSupervisor.user,
        });
        const refreshToken = await (0, jwt_util_1.signRefreshJWToken)({
            id: updatedSupervisor.id,
            email: updatedSupervisor.email,
            role: updatedSupervisor.user,
        });
        const encryptAccessToken = (0, crypto_utils_1.encryptToken)(accessToken);
        const encryptRefreshToken = (0, crypto_utils_1.encryptToken)(refreshToken);
        return {
            status: 201,
            message: "Updated supervisor successfully!",
            accessToken: encryptAccessToken,
            refreshToken: encryptRefreshToken,
            supervisor: updatedSupervisor,
        };
    },
    // DElETE SUPERVISOR USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    deleteSupervisor: async (_, { emailInput }, { prisma, auth }) => {
        var _a;
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const user = (0, getuser_util_1.default)(token);
        const { email: loginUserEmail, role } = user;
        // Authenticate user
        if (!user || loginUserEmail === '' || role === '')
            throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
        // Authorize the user to be either a Supervisor or an Admin
        if (role !== 'Supervisor' && role !== 'Admin')
            throw new apollo_server_express_1.AuthenticationError("Not authorized!");
        const { email } = emailInput;
        // Validate Input field
        const validate = supervisor_joi_1.DelSupervisorInputSchema.validate(emailInput);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Error! Invalid supervisor ID!");
        // Check if Supervisor Already Exist
        const supervisorExist = await prisma.supervisor.findUnique({
            where: { email },
        });
        if (!supervisorExist) {
            throw new apollo_server_express_1.AuthenticationError("Supervisor doesn't exist!");
        }
        // Authorized Genuine Login User
        if (loginUserEmail !== email) {
            throw new apollo_server_express_1.AuthenticationError("Not authorized: not a genuine user!");
        }
        // Delete Supervisor
        const deletedSupervisor = await prisma.supervisor.delete({
            where: { email: loginUserEmail },
        });
        const { id: deletedId, firstName, lastName, staffID } = deletedSupervisor;
        return {
            status: 200,
            message: "Deleted supervisor successfully!",
            id: deletedId,
            firstName,
            lastName,
            staffID,
        };
    },
};
exports.default = supervisorMutations;
//# sourceMappingURL=mutations.js.map