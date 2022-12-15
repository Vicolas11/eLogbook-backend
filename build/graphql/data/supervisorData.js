"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupervisorByIDs = exports.getSupervisorByDept = exports.getAllSupervisors = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const context_1 = require("../context");
const getAllSupervisors = async () => {
    const supervisors = await context_1.prisma.supervisor.findMany();
    return supervisors;
};
exports.getAllSupervisors = getAllSupervisors;
const getSupervisorByDept = async (department, institute) => {
    const supervisor = await context_1.prisma.supervisor.findMany({
        where: {
            AND: [
                { department },
                { institute }
            ]
        }
    });
    if (!supervisor)
        throw new apollo_server_express_1.AuthenticationError("Supervisor not found!");
    return supervisor;
};
exports.getSupervisorByDept = getSupervisorByDept;
const getSupervisorByID = async (id) => {
    console.log(`Called getUserById for id: ${id}`);
    const supervisor = await context_1.prisma.supervisor.findUnique({
        where: { id },
        include: {
            coordinator: true,
            students: true,
        },
    });
    if (!supervisor)
        throw new apollo_server_express_1.AuthenticationError("Supervisor not found!");
    return supervisor;
};
const getSupervisorByIDs = (ids) => {
    return ids.map((id) => getSupervisorByID(id));
};
exports.getSupervisorByIDs = getSupervisorByIDs;
//# sourceMappingURL=supervisorData.js.map