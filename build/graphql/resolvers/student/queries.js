"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const replacate_utils_1 = require("../../../utils/replacate.utils");
const crypto_utils_1 = require("../../../utils/crypto.utils");
const studentData_1 = require("../../data/studentData");
const studentQueries = {
    // Get student by LoginUserId
    student: async (_, { id }, { loaders, auth, prisma }) => {
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const loginUserId = await (0, replacate_utils_1.replicateStudAuth)(token, id, prisma);
        const query = await loaders.student.one(loginUserId);
        return query;
    },
    // Get All Students
    students: async (_, _args, { auth }) => {
        const token = (0, crypto_utils_1.decryptToken)(auth);
        (0, replacate_utils_1.replicateAdminAuth)(token);
        const query = await (0, studentData_1.getAllStudents)();
        return query;
    },
};
exports.default = studentQueries;
//# sourceMappingURL=queries.js.map