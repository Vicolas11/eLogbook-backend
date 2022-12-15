"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const replacate_utils_1 = require("../../../utils/replacate.utils");
const organisationData_1 = require("../../data/organisationData");
const crypto_utils_1 = require("../../../utils/crypto.utils");
const organisationQueries = {
    // Get Organisation by loginUserId
    organisation: async (_, { id }, { loaders, auth, prisma }) => {
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const loginUserId = await (0, replacate_utils_1.replicateOrgAuth)(token, id, prisma);
        const query = await loaders.organisation.one(loginUserId);
        return query;
    },
    // Get all Organisation
    organisations: async (_, _args, { auth }) => {
        // const token = decryptToken(auth) as string;
        // replicateAdminAuth(token);
        const query = await (0, organisationData_1.getAllOrganisations)();
        return query;
    },
};
exports.default = organisationQueries;
//# sourceMappingURL=queries.js.map