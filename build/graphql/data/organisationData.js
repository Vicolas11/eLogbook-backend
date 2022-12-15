"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrganisationByIDs = exports.getAllOrganisations = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const context_1 = require("../context");
const getAllOrganisations = async () => {
    const organisations = await context_1.prisma.organisation.findMany({
        include: {
            students: true,
        },
    });
    return organisations;
};
exports.getAllOrganisations = getAllOrganisations;
const getOrganisationByID = async (id) => {
    console.log(`Called getUserById for id: ${id}`);
    const organisation = await context_1.prisma.organisation.findUnique({
        where: { id },
        include: {
            students: true,
        },
    });
    if (!organisation)
        throw new apollo_server_express_1.AuthenticationError("Organisation not found!");
    return organisation;
};
const getOrganisationByIDs = (ids) => {
    return ids.map((id) => getOrganisationByID(id));
};
exports.getOrganisationByIDs = getOrganisationByIDs;
//# sourceMappingURL=organisationData.js.map