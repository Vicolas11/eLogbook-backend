"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const hashedPwd_util_1 = require("../../utils/hashedPwd.util");
const password_joi_1 = require("../../joi/password.joi");
const crypto_utils_1 = require("../../utils/crypto.utils");
const getuser_util_1 = __importDefault(require("../../utils/getuser.util"));
const changePswMutation = {
    changePassword: async (_, { input }, { prisma, auth }) => {
        var _a;
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const user = (0, getuser_util_1.default)(token);
        const { id: loginUserId, role } = user;
        // Authenticate user
        if (!user || loginUserId === '' || role === '')
            throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
        const { password: pwd, new_password, id: userId } = input;
        // Form Validation
        const validate = password_joi_1.changePswInputSchema.validate(input);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Validation Error!");
        const loginUserRole = role.toLowerCase();
        // Check if Email Already Exist
        const userExist = await prisma[loginUserRole].findUnique({
            where: { id: userId },
        });
        if (!userExist)
            throw new apollo_server_express_1.AuthenticationError("This user those not exist!");
        // Authorized Genuine Login User
        if (loginUserId !== userId)
            throw new apollo_server_express_1.AuthenticationError("Not authorized: not a genuine user!");
        // Change Password
        const hashPwd = userExist.password;
        // Validate current password with that of the database
        const isMatched = await (0, hashedPwd_util_1.validatePassword)({ pwd, hashPwd });
        if (!isMatched)
            throw new apollo_server_express_1.AuthenticationError("Password doesn't matched!");
        // Hashed and Replaced New Password Input
        const hashNewPwd = await (0, hashedPwd_util_1.hashPassword)(new_password);
        const newPassword = await prisma[loginUserRole].update({
            where: { id: loginUserId },
            data: { password: hashNewPwd },
        });
        return {
            status: newPassword ? 200 : 500,
            message: newPassword
                ? "Password changed sucessfully!"
                : "An error occurred!",
        };
    },
};
exports.default = changePswMutation;
//# sourceMappingURL=changepassword.js.map