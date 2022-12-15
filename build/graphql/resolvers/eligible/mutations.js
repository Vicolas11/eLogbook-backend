"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eligible_joi_1 = require("../../../joi/eligible.joi");
const apollo_server_express_1 = require("apollo-server-express");
const crypto_utils_1 = require("../../../utils/crypto.utils");
const getuser_util_1 = __importDefault(require("../../../utils/getuser.util"));
const uuid_1 = require("uuid");
const eligibleMutations = {
    // CREATE ELIGIBLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    eligible: async (_, { registerInput: input }, { prisma, auth }) => {
        var _a;
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const user = (0, getuser_util_1.default)(token);
        const { email, role } = user;
        // Authenticate user
        if (!user || email === "" || role === "")
            throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
        // Authorize the user to be either a Coordinator or an Admin
        if (role !== "Coordinator" && role !== "Admin")
            throw new apollo_server_express_1.AuthenticationError("Not authorized!");
        const { matricNo, level, email: supervisorEmail } = input;
        // Validate Input field
        const validate = eligible_joi_1.EligibleInputSchema.validate(input);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Validation Error!");
        // Validate if the Coodinator Existed!
        const coordinator = await prisma.coordinator.findUnique({
            where: { email },
        });
        if (!coordinator)
            throw new apollo_server_express_1.AuthenticationError("Assigned Coordinator doesn't exist!");
        // Validate if the Supervisor Existed!
        const supervisor = await prisma.supervisor.findUnique({
            where: { email: supervisorEmail },
        });
        if (!supervisor)
            throw new apollo_server_express_1.AuthenticationError("Assigned Supervisor doesn't exist!");
        const institute = coordinator.institute;
        const department = coordinator.department;
        // Get All the Matric Numbers send by the Coordinator
        const matricNums = matricNo.split(",");
        const eligibles = matricNums.map((num) => {
            return {
                matricNo: num.trim(),
                level,
                institute,
                department,
                id: (0, uuid_1.v4)(),
            };
        });
        // Check if Eligible Already Exist
        const eligibleExist = await prisma.eligible.findFirst({
            where: {
                OR: [
                    {
                        AND: [
                            { matricNo: { in: matricNums } },
                            { institute },
                            { department },
                        ],
                    },
                    {
                        matricNo: {
                            in: matricNums,
                        },
                    },
                ],
            },
        });
        if (eligibleExist)
            throw new apollo_server_express_1.AuthenticationError("One or more of these matric number's eligible already existed!");
        // Create New Eligiblilit(ies)
        let eligible = {
            id: "",
            institute: "",
            department: "",
            level: "L4",
            matricNo: "",
            createdAt: null,
            supervisorId: null,
            coordinatorId: null,
        };
        await Promise.all(eligibles.map(async (eligData) => {
            eligible = await prisma.eligible.create({
                data: {
                    ...eligData,
                    supervisor: { connect: { email: supervisorEmail } },
                    coordinator: { connect: { email } },
                },
                include: {
                    supervisor: true
                }
            });
            return eligible;
        }));
        return {
            status: 201,
            message: "Created eligibles successfully!",
            eligible,
        };
    },
    // UPDATE ELIGIBLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    updateEligible: async (_, { updateInput: input }, { prisma, auth }) => {
        var _a;
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const user = (0, getuser_util_1.default)(token);
        const { id: loginUserId, email: loginUserEmail, role } = user;
        // Authenticate user
        if (!user || loginUserEmail === "" || role === "" || loginUserId == "")
            throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
        // Authorize the user to be either a Coordinator or an Admin
        if (role !== "Coordinator" && role !== "Admin")
            throw new apollo_server_express_1.AuthenticationError("Not authorized!");
        const { id: eligibleId, level, email: supervisorEmail } = input;
        // Validate Input field
        const validate = eligible_joi_1.UpdateEligibleInputSchema.validate(input);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Validation Error!");
        // Check if Eligibility Already Exist
        const eligibleExist = await prisma.eligible.findUnique({
            where: { id: eligibleId },
        });
        if (!eligibleExist) {
            throw new apollo_server_express_1.AuthenticationError("Eligibility doesn't exist!");
        }
        // Authorized if is the genuine user
        if (eligibleExist.coordinatorId !== loginUserId)
            throw new apollo_server_express_1.AuthenticationError("Not authorized: Not genuine user!");
        // Validate if the Supervisor Existed!
        const supervisor = await prisma.supervisor.findUnique({
            where: { email: supervisorEmail },
        });
        if (!supervisor)
            throw new apollo_server_express_1.AuthenticationError("Assigned Supervisor doesn't exist!");
        // Update Eligible User
        const data = { level };
        const updatedEligible = await prisma.eligible.update({
            where: { id: eligibleId },
            data: {
                ...data,
                supervisor: {
                    connect: { email: supervisorEmail },
                },
            },
            include: {
                supervisor: true
            }
        });
        const matricNo = eligibleExist.matricNo;
        const student = await prisma.student.findFirst({ where: { matricNo } });
        const email = student === null || student === void 0 ? void 0 : student.email;
        // Update student's supervisor as well
        await prisma.student.update({
            where: { email },
            data: {
                supervisor: {
                    connect: {
                        email: supervisorEmail,
                    },
                },
            },
        });
        return {
            status: 201,
            message: "Updated eligible successfully!",
            eligible: updatedEligible,
        };
    },
    // DElETE ELIGIBLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    deleteEligible: async (_, { deleteInput: input }, { prisma, auth }) => {
        var _a;
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const user = (0, getuser_util_1.default)(token);
        const { id: loginUserId, email: loginUserEmail, role } = user;
        // Authenticate user
        if (!user || loginUserEmail === "" || role === "" || loginUserId === "")
            throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
        // Authorize the user to be either a Coordinator or an Admin
        if (role !== "Coordinator" && role !== "Admin")
            throw new apollo_server_express_1.AuthenticationError("Not authorized!");
        const { id } = input;
        // Validate Input field
        const validate = eligible_joi_1.DelEligibleInputSchema.validate(input);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Error! Invalid eligible ID!");
        // Check if Eligible Already Exist
        const eligibleExist = await prisma.eligible.findUnique({
            where: { id },
        });
        if (!eligibleExist) {
            throw new apollo_server_express_1.AuthenticationError("Eligible doesn't exist!");
        }
        // Authorize if loginUser is genuine
        if (eligibleExist.coordinatorId !== loginUserId)
            throw new apollo_server_express_1.AuthenticationError("Not authorized: Not genuine user!");
        // Delete Eligible
        const delEligible = await prisma.eligible.delete({
            where: { id },
        });
        return {
            status: 200,
            message: "Deleted eligible successfully!",
            eligible: delEligible,
        };
    },
};
exports.default = eligibleMutations;
//# sourceMappingURL=mutations.js.map