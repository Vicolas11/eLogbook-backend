"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const replacate_utils_1 = require("../../../utils/replacate.utils");
const eligibleData_1 = require("../../data/eligibleData");
const crypto_utils_1 = require("../../../utils/crypto.utils");
const eligibleQueries = {
    // Get eligible by Login userID
    eligible: async (_, { id }, { loaders, auth, prisma }) => {
        // const token = decryptToken(auth) as string;
        // const loginUserId = await replicateCoordAuth(token, id, prisma);
        const query = await loaders.eligible.one(id);
        return query;
    },
    // Get all eligibles
    eligibles: async (_, _args, { auth }) => {
        const token = (0, crypto_utils_1.decryptToken)(auth);
        (0, replacate_utils_1.replicateAdminAuth)(token);
        const query = await (0, eligibleData_1.getAllEligibles)();
        return query;
    },
    // Get all eligibles by Depts and Institution
    eligiblesByDept: async (_, { input }, { auth, prisma }) => {
        const { id, department, institute } = input;
        const token = (0, crypto_utils_1.decryptToken)(auth);
        (0, replacate_utils_1.replicateCoordAuth)(token, id, prisma);
        const query = await (0, eligibleData_1.getAllEligiblesByDepts)(department, institute);
        return query;
    },
};
exports.default = eligibleQueries;
//# sourceMappingURL=queries.js.map