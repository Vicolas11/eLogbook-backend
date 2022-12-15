"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_util_1 = require("../../../utils/jwt.util");
const apollo_server_express_1 = require("apollo-server-express");
const hashedPwd_util_1 = require("../../../utils/hashedPwd.util");
const crypto_utils_1 = require("../../../utils/crypto.utils");
const login_joi_1 = require("../../../joi/login.joi");
const coordinatorLogin = {
    loginCoordinator: async (_, { loginInput: input }, { prisma }) => {
        var _a;
        const { email, password: pwd } = input;
        // Validate Input field
        const validate = login_joi_1.LoginInputSchema.validate(input);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Validation Error!");
        // Verify User and it's Role
        const coordinator = await prisma.coordinator.findUnique({ where: { email } });
        if (!coordinator)
            throw new apollo_server_express_1.AuthenticationError("Coordinator doesn't exist!");
        if (coordinator.user !== "Coordinator")
            throw new apollo_server_express_1.AuthenticationError("Invalid user type!");
        // Verify Password
        const hashPwd = coordinator.password;
        const hasMatched = await (0, hashedPwd_util_1.validatePassword)({ pwd, hashPwd });
        if (!hasMatched)
            throw new apollo_server_express_1.AuthenticationError("Invalid Password!");
        // Generate Access and Refreshed Token
        const accessToken = await (0, jwt_util_1.signAccessJWToken)({
            id: coordinator.id,
            email: coordinator.email,
            role: coordinator.user,
        });
        const refreshToken = await (0, jwt_util_1.signRefreshJWToken)({
            id: coordinator.id,
            email: coordinator.email,
            role: coordinator.user,
        });
        // Remove Password field for security reasons
        Reflect.deleteProperty(coordinator, "password");
        const encryptAccessToken = (0, crypto_utils_1.encryptToken)(accessToken);
        const encryptRefreshToken = (0, crypto_utils_1.encryptToken)(refreshToken);
        return {
            status: 201,
            message: "Login successfully!",
            accessToken: encryptAccessToken,
            refreshToken: encryptRefreshToken,
            coordinator,
        };
    },
};
exports.default = coordinatorLogin;
//# sourceMappingURL=coordinator.js.map