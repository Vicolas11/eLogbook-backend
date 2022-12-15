"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const organisation_joi_1 = require("../../../joi/organisation.joi");
const jwt_util_1 = require("../../../utils/jwt.util");
const apollo_server_express_1 = require("apollo-server-express");
const crypto_utils_1 = require("../../../utils/crypto.utils");
const hashedPwd_util_1 = require("../../../utils/hashedPwd.util");
const getuser_util_1 = __importDefault(require("../../../utils/getuser.util"));
const uuid_1 = require("uuid");
const organisationMutations = {
    // CREATE ORGANISATION USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    organisation: async (_, { registerInput: input }, { prisma }) => {
        var _a;
        // Validate Input field
        const validate = organisation_joi_1.OrganisationInputSchema.validate(input);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Validation Error!");
        const { email } = input;
        // Check if Email Already Exist
        const organisationExist = await prisma.organisation.findUnique({
            where: { email },
        });
        if (organisationExist)
            throw new apollo_server_express_1.AuthenticationError("Organisation already existed!");
        // Hashed and Replaced Password Input
        const hashPwd = await (0, hashedPwd_util_1.hashPassword)(input.password);
        input.password = hashPwd;
        // Create New Organisation User
        const organisationData = {
            ...input,
            id: (0, uuid_1.v4)(),
        };
        const newOrganisation = await prisma.organisation.create({
            data: organisationData,
        });
        // Remove the password field for security reasons
        Reflect.deleteProperty(newOrganisation, "password");
        // Generate Access and Refreshed Token
        const accessToken = await (0, jwt_util_1.signAccessJWToken)({
            id: newOrganisation.id,
            email: newOrganisation.email,
            role: newOrganisation.user,
        });
        const refreshToken = await (0, jwt_util_1.signRefreshJWToken)({
            id: newOrganisation.id,
            email: newOrganisation.email,
            role: newOrganisation.user,
        });
        const encryptAccessToken = (0, crypto_utils_1.encryptToken)(accessToken);
        const encryptRefreshToken = (0, crypto_utils_1.encryptToken)(refreshToken);
        return {
            status: 201,
            message: "Created organisation successfully!",
            accessToken: encryptAccessToken,
            refreshToken: encryptRefreshToken,
            organisation: newOrganisation,
        };
    },
    // UPDATE ORGANISATION USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    updateOrganisation: async (_, { updateInput: input }, { prisma, auth }) => {
        var _a;
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const user = (0, getuser_util_1.default)(token);
        const { email: loginUserEmail, role } = user;
        // Authenticate user
        if (!user || loginUserEmail === '' || role === '')
            throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
        // Authorize the user to be either a Organisation or an Admin
        if (role !== 'Organisation' && role !== 'Admin')
            throw new apollo_server_express_1.AuthenticationError("Not authorized!");
        const { email, name, sector, phone, address, employees, logo } = input;
        // Validate Input field
        const validate = organisation_joi_1.UpdateOrganisationInputSchema.validate(input);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Validation Error!");
        // Check if Email Already Exist
        const organisationExist = await prisma.organisation.findUnique({
            where: { email },
        });
        if (!organisationExist)
            throw new apollo_server_express_1.AuthenticationError("Organisation doesn't exist!");
        // Authorized Genuine Login User
        if (loginUserEmail !== email)
            throw new apollo_server_express_1.AuthenticationError("Not authorized: not a genuine user!");
        // Update Organisation User
        const updateOrganisationData = {
            name,
            sector,
            phone,
            address,
            employees,
            logo,
        };
        const updatedOrganisation = await prisma.organisation.update({
            where: { email: loginUserEmail },
            data: updateOrganisationData,
        });
        // Generate Access and Refreshed Token
        const accessToken = await (0, jwt_util_1.signAccessJWToken)({
            id: updatedOrganisation.id,
            email: updatedOrganisation.email,
            role: updatedOrganisation.user,
        });
        const refreshToken = await (0, jwt_util_1.signRefreshJWToken)({
            id: updatedOrganisation.id,
            email: updatedOrganisation.email,
            role: updatedOrganisation.user,
        });
        const encryptAccessToken = (0, crypto_utils_1.encryptToken)(accessToken);
        const encryptRefreshToken = (0, crypto_utils_1.encryptToken)(refreshToken);
        return {
            status: 201,
            message: "Updated organisation successfully!",
            accessToken: encryptAccessToken,
            refreshToken: encryptRefreshToken,
            organisation: updatedOrganisation,
        };
    },
    // DElETE ORGANISATION USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    deleteOrganisation: async (_, { emailInput }, { prisma, auth }) => {
        var _a;
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const user = (0, getuser_util_1.default)(token);
        const { email: loginUserEmail, role } = user;
        // Authenticate user
        if (!user || loginUserEmail === '' || role === '')
            throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
        // Authorize the user to be either a Organisation or an Admin
        if (role !== 'Organisation' && role !== 'Admin')
            throw new apollo_server_express_1.AuthenticationError("Not authorized!");
        const { email } = emailInput;
        // Validate Input field
        const validate = organisation_joi_1.DelOrganisationInputSchema.validate(emailInput);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Error! Invalid organisation ID!");
        // Check if Organisation Already Exist
        const organisationExist = await prisma.organisation.findUnique({
            where: { email },
        });
        if (!organisationExist) {
            throw new apollo_server_express_1.AuthenticationError("Organisation doesn't exist!");
        }
        // Authorized Genuine Login User
        if (loginUserEmail !== email) {
            throw new apollo_server_express_1.AuthenticationError("Not authorized: not a genuine user!");
        }
        // Delete Organisation
        const deletedOrganisation = await prisma.organisation.delete({
            where: { email: loginUserEmail },
        });
        const { id: delId, name, sector, email: delEmail } = deletedOrganisation;
        return {
            status: 200,
            message: "Deleted organisation successfully!",
            id: delId,
            name,
            sector,
            email: delEmail,
        };
    },
};
exports.default = organisationMutations;
//# sourceMappingURL=mutations.js.map