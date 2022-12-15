"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const organisationData_1 = require("./data/organisationData");
const coordinatorData_1 = require("./data/coordinatorData");
const supervisorData_1 = require("./data/supervisorData");
const blogpostData_1 = require("./data/blogpostData");
const eligibleData_1 = require("./data/eligibleData");
const studentData_1 = require("./data/studentData");
const client_1 = require("@prisma/client");
const dataloader_1 = __importDefault(require("dataloader"));
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
// STUDENT LOADER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const studentLoader = () => {
    const loader = new dataloader_1.default(async (ids) => {
        return (0, studentData_1.getStudentByIDs)(ids);
    });
    return {
        one: async (id) => loader.load(id),
    };
};
// SUPERVISOR LOADER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const supervisorLoader = () => {
    const loader = new dataloader_1.default(async (ids) => {
        return (0, supervisorData_1.getSupervisorByIDs)(ids);
    });
    return {
        one: async (id) => loader.load(id),
    };
};
// COORDINATOR LOADER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const coordinatorLoader = () => {
    const loader = new dataloader_1.default(async (ids) => {
        return (0, coordinatorData_1.getCoordinatorByIDs)(ids);
    });
    return {
        one: async (id) => loader.load(id),
    };
};
// ORGANISATION LOADER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const organisationLoader = () => {
    const loader = new dataloader_1.default(async (ids) => {
        return (0, organisationData_1.getOrganisationByIDs)(ids);
    });
    return {
        one: async (id) => loader.load(id),
    };
};
const blogPostLoader = () => {
    const loader = new dataloader_1.default(async (ids) => {
        return (0, blogpostData_1.getBlogPostByIDs)(ids);
    });
    return {
        one: async (id) => loader.load(id),
    };
};
const eligibleLoader = () => {
    const loader = new dataloader_1.default(async (ids) => {
        return (0, eligibleData_1.getEligibleByIDs)(ids);
    });
    return {
        one: async (id) => loader.load(id),
    };
};
const context = async ({ req }) => {
    const auth = req.headers.authorization || "";
    return {
        loaders: {
            student: studentLoader(),
            supervisor: supervisorLoader(),
            coordinator: coordinatorLoader(),
            organisation: organisationLoader(),
            blogPost: blogPostLoader(),
            eligible: eligibleLoader(),
        },
        prisma,
        auth: auth,
    };
};
exports.default = context;
//# sourceMappingURL=context.js.map