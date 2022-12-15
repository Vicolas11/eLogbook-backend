"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coordinator_joi_1 = require("../../../joi/coordinator.joi");
const jwt_util_1 = require("../../../utils/jwt.util");
const apollo_server_express_1 = require("apollo-server-express");
const crypto_utils_1 = require("../../../utils/crypto.utils");
const hashedPwd_util_1 = require("../../../utils/hashedPwd.util");
const getuser_util_1 = __importDefault(require("../../../utils/getuser.util"));
const uuid_1 = require("uuid");
const coordinatorMutations = {
    // CREATE COORDINATOR USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    coordinator: async (_, { registerInput: input }, { prisma }) => {
        var _a;
        const { department, institute, email } = input;
        // Validate Input field
        const validate = coordinator_joi_1.CoordinatorInputSchema.validate(input);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Validation Error!");
        // Check if Email Already Exist
        const coordinatorExist = await prisma.coordinator.findUnique({
            where: { email },
        });
        if (coordinatorExist)
            throw new apollo_server_express_1.AuthenticationError("Coordinator already existed!");
        // Validate only a coordinator exist in dept of a school
        const onlyCoordExist = await prisma.coordinator.findFirst({
            where: { AND: [{ department }, { institute }] },
        });
        if (onlyCoordExist)
            throw new apollo_server_express_1.AuthenticationError("Coordinator in this department of this school already existed!");
        // Hashed and Replaced Password Input
        const hashPwd = await (0, hashedPwd_util_1.hashPassword)(input.password);
        input.password = hashPwd;
        // Create New Coordinator User
        const coordinatorData = {
            ...input,
            id: (0, uuid_1.v4)(),
        };
        const newCoordinator = await prisma.coordinator.create({
            data: coordinatorData,
        });
        // Remove the password field for security reasons
        Reflect.deleteProperty(newCoordinator, "password");
        // Generate Access and Refreshed Token
        const accessToken = await (0, jwt_util_1.signAccessJWToken)({
            id: newCoordinator.id,
            email: newCoordinator.email,
            role: newCoordinator.user,
        });
        const refreshToken = await (0, jwt_util_1.signRefreshJWToken)({
            id: newCoordinator.id,
            email: newCoordinator.email,
            role: newCoordinator.user,
        });
        const encryptAccessToken = (0, crypto_utils_1.encryptToken)(accessToken);
        const encryptRefreshToken = (0, crypto_utils_1.encryptToken)(refreshToken);
        return {
            status: 201,
            message: "Created coordinator successfully!",
            accessToken: encryptAccessToken,
            refreshToken: encryptRefreshToken,
            coordinator: newCoordinator,
        };
    },
    // UPDATE COORDINATOR USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    updateCoordinator: async (_, { updateInput: input }, { prisma, auth }) => {
        var _a;
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const user = (0, getuser_util_1.default)(token);
        const { email: loginUserEmail, role } = user;
        // Authenticate user
        if (!user || loginUserEmail === '' || role === '')
            throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
        // Authorize the user to be either a Coordinator or an Admin
        if (role !== 'Coordinator' && role !== 'Admin')
            throw new apollo_server_express_1.AuthenticationError("Not authorized!");
        const { title, firstName, lastName, phone, gender, avatar, email } = input;
        // Validate Input field
        const validate = coordinator_joi_1.UpdateCoordinatorInputSchema.validate(input);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Validation Error!");
        // Check if Email Already Exist
        const coordinatorExist = await prisma.coordinator.findUnique({
            where: { email },
        });
        if (!coordinatorExist) {
            throw new apollo_server_express_1.AuthenticationError("Coordinator doesn't exist!");
        }
        // Authorized Genuine Login User
        if (loginUserEmail !== email) {
            throw new apollo_server_express_1.AuthenticationError("Not authorized: not a genuine user!");
        }
        // Update Coordinator User
        const updateCoordinatorData = {
            title,
            firstName,
            lastName,
            phone,
            gender,
            avatar,
        };
        const updatedCoordinator = await prisma.coordinator.update({
            where: { email: loginUserEmail },
            data: updateCoordinatorData,
        });
        // Generate Access and Refreshed Token
        const accessToken = await (0, jwt_util_1.signAccessJWToken)({
            id: updatedCoordinator.id,
            email: updatedCoordinator.email,
            role: updatedCoordinator.user,
        });
        const refreshToken = await (0, jwt_util_1.signRefreshJWToken)({
            id: updatedCoordinator.id,
            email: updatedCoordinator.email,
            role: updatedCoordinator.user,
        });
        const encryptAccessToken = (0, crypto_utils_1.encryptToken)(accessToken);
        const encryptRefreshToken = (0, crypto_utils_1.encryptToken)(refreshToken);
        return {
            status: 201,
            message: "Updated coordinator successfully!",
            accessToken: encryptAccessToken,
            refreshToken: encryptRefreshToken,
            coordinator: updatedCoordinator,
        };
    },
    // DElETE COORDINATOR USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    deleteCoordinator: async (_, { emailInput }, { prisma, auth }) => {
        var _a;
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const user = (0, getuser_util_1.default)(token);
        const { email: loginUserEmail, role } = user;
        // Authenticate user
        if (!user || loginUserEmail === '' || role === '')
            throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
        // Authorize the user to be either a Coordinator or an Admin
        if (role !== 'Coordinator' && role !== 'Admin')
            throw new apollo_server_express_1.AuthenticationError("Not authorized!");
        const { email } = emailInput;
        // Validate Input field
        const validate = coordinator_joi_1.DelCoordinatorInputSchema.validate(emailInput);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Error! Invalid coordinator ID!");
        // Check if Coordinator Already Exist
        const coordinatorExist = await prisma.coordinator.findUnique({
            where: { email },
        });
        if (!coordinatorExist) {
            throw new apollo_server_express_1.AuthenticationError("Coordinator doesn't exist!");
        }
        // Authorized Genuine Login User
        if (loginUserEmail !== email) {
            throw new apollo_server_express_1.AuthenticationError("Not authorized: not a genuine user!");
        }
        // Delete Coordinator
        const deletedCoordinator = await prisma.coordinator.delete({
            where: { email: loginUserEmail },
        });
        const { id: deletedId, firstName, lastName, staffID } = deletedCoordinator;
        return {
            status: 200,
            message: "Deleted coordinator successfully!",
            id: deletedId,
            firstName,
            lastName,
            staffID,
        };
    },
};
exports.default = coordinatorMutations;
//# sourceMappingURL=mutations.js.map