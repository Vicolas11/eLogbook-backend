"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoordinatorByIDs = exports.getAllCoordinators = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const context_1 = require("../context");
const getAllCoordinators = async () => {
    const coordinators = await context_1.prisma.coordinator.findMany({
        include: {
            students: true,
            supervisors: true,
        },
    });
    return coordinators;
};
exports.getAllCoordinators = getAllCoordinators;
const getCoordinatorByID = async (id) => {
    console.log(`Called getUserById for id: ${id}`);
    const coordinator = await context_1.prisma.coordinator.findUnique({
        where: { id },
        include: {
            students: true,
            supervisors: true,
        },
    });
    if (!coordinator)
        throw new apollo_server_express_1.AuthenticationError("Coordinator not found!");
    return coordinator;
};
const getCoordinatorByIDs = (ids) => {
    return ids.map((id) => getCoordinatorByID(id));
};
exports.getCoordinatorByIDs = getCoordinatorByIDs;
//# sourceMappingURL=coordinatorData.js.map