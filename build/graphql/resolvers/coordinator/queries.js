"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const replacate_utils_1 = require("../../../utils/replacate.utils");
const coordinatorData_1 = require("../../data/coordinatorData");
const crypto_utils_1 = require("../../../utils/crypto.utils");
const coordinatorQueries = {
    coordinator: async (_, { id }, { loaders, auth, prisma }) => {
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const loginUserId = await (0, replacate_utils_1.replicateCoordAuth)(token, id, prisma);
        const query = await loaders.coordinator.one(loginUserId);
        return query;
    },
    coordinators: async (_, _args, { auth }) => {
        const token = (0, crypto_utils_1.decryptToken)(auth);
        (0, replacate_utils_1.replicateAdminAuth)(token);
        const query = await (0, coordinatorData_1.getAllCoordinators)();
        return query;
    },
};
exports.default = coordinatorQueries;
//# sourceMappingURL=queries.js.map