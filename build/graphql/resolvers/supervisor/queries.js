"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const replacate_utils_1 = require("../../../utils/replacate.utils");
const supervisorData_1 = require("../../data/supervisorData");
const crypto_utils_1 = require("../../../utils/crypto.utils");
const supervisorQueries = {
    // Get Supervisor by loginUserId
    supervisor: async (_, { id }, { loaders, auth, prisma }) => {
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const loginUserId = await (0, replacate_utils_1.replicateSupAuth)(token, id, prisma);
        const query = await loaders.supervisor.one(loginUserId);
        return query;
    },
    // Get All Supervisors
    supervisors: async (_, _args, { auth }) => {
        const token = (0, crypto_utils_1.decryptToken)(auth);
        (0, replacate_utils_1.replicateAdminAuth)(token);
        const query = await (0, supervisorData_1.getAllSupervisors)();
        return query;
    },
    // Get All Supervisors Department and Institution
    supervisorsByDepts: async (_, { input }) => {
        const { department, institute } = input;
        const query = await (0, supervisorData_1.getSupervisorByDept)(department, institute);
        return query;
    },
};
exports.default = supervisorQueries;
//# sourceMappingURL=queries.js.map