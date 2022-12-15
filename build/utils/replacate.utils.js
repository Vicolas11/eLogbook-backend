"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replicateAdminAuth = exports.replicateOrgAuth = exports.replicateCoordAuth = exports.replicateSupAuth = exports.replicateStudAuth = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const getuser_util_1 = __importDefault(require("./getuser.util"));
const replicateStudAuth = async (token, id, prisma) => {
    const user = (0, getuser_util_1.default)(token);
    const { id: loginUserId, role } = user;
    // Authenticate user
    if (!user || loginUserId === "" || role === "")
        throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
    // Authorize the user to be either a Student or an Admin
    if (role !== "Student" && role !== "Admin")
        throw new apollo_server_express_1.AuthenticationError("Not authorized!");
    // Check if Student Already Exist
    const studExist = await prisma.student.findUnique({
        where: { id },
    });
    if (!studExist)
        throw new apollo_server_express_1.AuthenticationError("Student doesn't exist!");
    if (loginUserId !== id)
        throw new apollo_server_express_1.AuthenticationError("Not authorized!");
    return loginUserId;
};
exports.replicateStudAuth = replicateStudAuth;
const replicateSupAuth = async (token, id, prisma) => {
    const user = (0, getuser_util_1.default)(token);
    const { id: loginUserId, role } = user;
    // Authenticate user
    if (!user || loginUserId === "" || role === "")
        throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
    // Authorize the user to be Supervisor or an Admin
    if (role !== "Supervisor" && role !== "Admin")
        throw new apollo_server_express_1.AuthenticationError("Not authorized!");
    // Check if Supervisor Already Exist
    const supExist = await prisma.supervisor.findUnique({
        where: { id },
    });
    if (!supExist)
        throw new apollo_server_express_1.AuthenticationError("Supervisor doesn't exist!");
    if (loginUserId !== id)
        throw new apollo_server_express_1.AuthenticationError("Not authorized!");
    return loginUserId;
};
exports.replicateSupAuth = replicateSupAuth;
const replicateCoordAuth = async (token, id, prisma) => {
    const user = (0, getuser_util_1.default)(token);
    const { id: loginUserId, role } = user;
    // Authenticate user
    if (!user || loginUserId === "" || role === "")
        throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
    // Authorize the user to be either a Coordinator or an Admin
    if (role !== "Coordinator" && role !== "Admin")
        throw new apollo_server_express_1.AuthenticationError("Not authorized!");
    // Check if Coordinator Already Exist
    const cordExist = await prisma.coordinator.findUnique({
        where: { id },
    });
    if (!cordExist)
        throw new apollo_server_express_1.AuthenticationError("Coordinator doesn't exist!");
    if (loginUserId !== id)
        throw new apollo_server_express_1.AuthenticationError("Not authorized!");
    return loginUserId;
};
exports.replicateCoordAuth = replicateCoordAuth;
const replicateOrgAuth = async (token, id, prisma) => {
    const user = (0, getuser_util_1.default)(token);
    const { id: loginUserId, role } = user;
    // Authenticate user
    if (!user || loginUserId === "" || role === "")
        throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
    // Authorize the user to be either a Organisation or an Admin
    if (role !== "Organisation" && role !== "Admin")
        throw new apollo_server_express_1.AuthenticationError("Not authorized!");
    // Check if Organisation Already Exist
    const orgExist = await prisma.organisation.findUnique({
        where: { id },
    });
    if (!orgExist)
        throw new apollo_server_express_1.AuthenticationError("Organisation doesn't exist!");
    if (loginUserId !== id)
        throw new apollo_server_express_1.AuthenticationError("Not authorized!");
    return loginUserId;
};
exports.replicateOrgAuth = replicateOrgAuth;
const replicateAdminAuth = (token) => {
    const user = (0, getuser_util_1.default)(token);
    const { email, role } = user;
    // Authenticate user
    if (!user || email === "" || role === "")
        throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
    // Authorize the user to be either a Coordinator or an Admin
    if (role !== "Admin")
        throw new apollo_server_express_1.AuthenticationError("Not authorized!");
};
exports.replicateAdminAuth = replicateAdminAuth;
//# sourceMappingURL=replacate.utils.js.map