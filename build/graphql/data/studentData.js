"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentByIDs = exports.getAllStudents = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const context_1 = require("../context");
const getAllStudents = async () => {
    const students = await context_1.prisma.student.findMany({
        include: {
            logbooks: true,
            supervisor: true,
            coordinator: true,
            organisation: true,
        },
    });
    return students;
};
exports.getAllStudents = getAllStudents;
const getStudentByID = async (id) => {
    console.log(`Called getUserById for id: ${id}`);
    const student = await context_1.prisma.student.findUnique({
        where: { id },
        include: {
            logbooks: true,
            supervisor: true,
            coordinator: true,
            organisation: true,
        },
    });
    if (!student)
        throw new apollo_server_express_1.AuthenticationError("Student not found!");
    return student;
};
const getStudentByIDs = (ids) => {
    return ids.map((id) => getStudentByID(id));
};
exports.getStudentByIDs = getStudentByIDs;
//# sourceMappingURL=studentData.js.map