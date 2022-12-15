"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_util_1 = require("../../../utils/jwt.util");
const apollo_server_express_1 = require("apollo-server-express");
const hashedPwd_util_1 = require("../../../utils/hashedPwd.util");
const crypto_utils_1 = require("../../../utils/crypto.utils");
const login_joi_1 = require("../../../joi/login.joi");
const supervisorLogin = {
    loginSupervisor: async (_, { loginInput: input }, { prisma }) => {
        var _a;
        const { email, password: pwd } = input;
        // Validate Input field
        const validate = login_joi_1.LoginInputSchema.validate(input);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Validation Error!");
        // Verify User and it's Role
        const supervisor = await prisma.supervisor.findUnique({ where: { email } });
        if (!supervisor)
            throw new apollo_server_express_1.AuthenticationError("Supervisor doesn't exist!");
        if (supervisor.user !== "Supervisor")
            throw new apollo_server_express_1.AuthenticationError("Invalid user type!");
        // Verify Password
        const hashPwd = supervisor.password;
        const hasMatched = await (0, hashedPwd_util_1.validatePassword)({ pwd, hashPwd });
        if (!hasMatched)
            throw new apollo_server_express_1.AuthenticationError("Invalid Password!");
        // Generate Access and Refreshed Token
        const accessToken = await (0, jwt_util_1.signAccessJWToken)({
            id: supervisor.id,
            email: supervisor.email,
            role: supervisor.user,
        });
        const refreshToken = await (0, jwt_util_1.signRefreshJWToken)({
            id: supervisor.id,
            email: supervisor.email,
            role: supervisor.user,
        });
        // Remove Password field for security reasons
        Reflect.deleteProperty(supervisor, "password");
        const encryptAccessToken = (0, crypto_utils_1.encryptToken)(accessToken);
        const encryptRefreshToken = (0, crypto_utils_1.encryptToken)(refreshToken);
        return {
            status: 201,
            message: "Login successfully!",
            accessToken: encryptAccessToken,
            refreshToken: encryptRefreshToken,
            supervisor
        };
    },
};
exports.default = supervisorLogin;
//# sourceMappingURL=supervisor.js.map