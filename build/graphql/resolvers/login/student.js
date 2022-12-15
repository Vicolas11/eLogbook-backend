"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_util_1 = require("../../../utils/jwt.util");
const apollo_server_express_1 = require("apollo-server-express");
const hashedPwd_util_1 = require("../../../utils/hashedPwd.util");
const crypto_utils_1 = require("../../../utils/crypto.utils");
const login_joi_1 = require("../../../joi/login.joi");
const studentLogin = {
    loginStudent: async (_, { loginInput: input }, { prisma }) => {
        var _a;
        const { email, password: pwd } = input;
        // Validate Input field
        const validate = login_joi_1.LoginInputSchema.validate(input);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Validation Error!");
        // Verify User and it's Role
        const student = await prisma.student.findUnique({
            where: { email },
            include: {
                coordinator: true,
                supervisor: true,
                organisation: true
            },
        });
        if (!student)
            throw new apollo_server_express_1.AuthenticationError("Student doesn't exist!");
        if (student.user !== "Student")
            throw new apollo_server_express_1.AuthenticationError("Invalid user type!");
        // Verify Password
        const hashPwd = student.password;
        const hasMatched = await (0, hashedPwd_util_1.validatePassword)({ pwd, hashPwd });
        if (!hasMatched)
            throw new apollo_server_express_1.AuthenticationError("Invalid Password!");
        // Generate Access and Refreshed Token
        const accessToken = await (0, jwt_util_1.signAccessJWToken)({
            id: student.id,
            email: student.email,
            role: student.user,
        });
        const refreshToken = await (0, jwt_util_1.signRefreshJWToken)({
            id: student.id,
            email: student.email,
            role: student.user,
        });
        // Remove Password field for security reasons
        Reflect.deleteProperty(student, "password");
        const encryptAccessToken = (0, crypto_utils_1.encryptToken)(accessToken);
        const encryptRefreshToken = (0, crypto_utils_1.encryptToken)(refreshToken);
        return {
            status: 201,
            message: "Login successfully!",
            accessToken: encryptAccessToken,
            refreshToken: encryptRefreshToken,
            student,
        };
    },
};
exports.default = studentLogin;
//# sourceMappingURL=student.js.map