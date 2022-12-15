"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEligibleByIDs = exports.getAllEligiblesByDepts = exports.getAllEligibles = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const context_1 = require("../context");
const getAllEligibles = async () => {
    const eligibles = await context_1.prisma.eligible.findMany({
        include: {
            supervisor: true,
            coordinator: true,
        },
    });
    return eligibles;
};
exports.getAllEligibles = getAllEligibles;
const getAllEligiblesByDepts = async (department, institute) => {
    const eligibles = await context_1.prisma.eligible.findMany({
        where: {
            AND: [
                { department },
                { institute }
            ]
        },
        include: {
            supervisor: true
        },
    });
    if (!eligibles)
        throw new apollo_server_express_1.AuthenticationError("Eligiblility not found!");
    return eligibles;
};
exports.getAllEligiblesByDepts = getAllEligiblesByDepts;
const getEligibleByID = async (id) => {
    console.log(`Called getUserById for id: ${id}`);
    const eligible = await context_1.prisma.eligible.findFirst({
        where: { OR: [{ id }, { matricNo: id }] },
        include: {
            supervisor: true,
            coordinator: true,
        },
    });
    if (!eligible)
        throw new apollo_server_express_1.AuthenticationError("Eligiblility not found!");
    return eligible;
};
const getEligibleByIDs = (ids) => {
    return ids.map((id) => getEligibleByID(id));
};
exports.getEligibleByIDs = getEligibleByIDs;
//# sourceMappingURL=eligibleData.js.map