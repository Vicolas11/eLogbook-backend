"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_joi_1 = require("../../../joi/student.joi");
const jwt_util_1 = require("../../../utils/jwt.util");
const apollo_server_express_1 = require("apollo-server-express");
const crypto_utils_1 = require("../../../utils/crypto.utils");
const hashedPwd_util_1 = require("../../../utils/hashedPwd.util");
const titlecase_utl_1 = __importDefault(require("../../../utils/titlecase.utl"));
const getuser_util_1 = __importDefault(require("../../../utils/getuser.util"));
const uuid_1 = require("uuid");
const studentMutations = {
    // CREATE STUDENT USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    student: async (_, { registerInput: input }, { prisma }) => {
        var _a, _b, _c;
        const { firstName, lastName, matricNo, address, institute, department, email, password, place: organisationEmail, } = input;
        // Validate Input field
        const validate = student_joi_1.StudentInputSchema.validate(input);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Validation Error!");
        // Check if Student Already Exist
        const studentExist = await prisma.student.findFirst({
            where: { OR: [
                    { email },
                    { matricNo }
                ] },
        });
        if (studentExist)
            throw new apollo_server_express_1.AuthenticationError("Student already existed!");
        // Check if the Student is Eligible
        const eligible = await prisma.eligible.findUnique({
            where: { matricNo },
            include: {
                supervisor: true,
                coordinator: true,
            },
        });
        if (!eligible)
            throw new apollo_server_express_1.AuthenticationError("Sorry, you aren't eligible to signup yet!");
        // Check if the organisation existed
        const organisation = await prisma.organisation.findUnique({
            where: { email: organisationEmail },
        });
        if (!organisation)
            throw new apollo_server_express_1.AuthenticationError("This organisation doesn't exist!");
        // Get Student assigned Supervior and Coordinator emails
        const supervisorId = (_b = eligible.supervisor) === null || _b === void 0 ? void 0 : _b.id;
        const cooordinatorId = (_c = eligible.coordinator) === null || _c === void 0 ? void 0 : _c.id;
        const organisationId = organisation.id;
        // Hashed and Replaced Password Input
        const hashPwd = await (0, hashedPwd_util_1.hashPassword)(password);
        input.password = hashPwd;
        input.firstName = (0, titlecase_utl_1.default)(firstName);
        input.lastName = (0, titlecase_utl_1.default)(lastName);
        input.email = email.toLowerCase();
        input.matricNo = matricNo.toUpperCase();
        input.institute = (0, titlecase_utl_1.default)(institute);
        input.department = (0, titlecase_utl_1.default)(department);
        input.address = (0, titlecase_utl_1.default)(address);
        // Create New Student User
        const studentData = {
            ...input,
            id: (0, uuid_1.v4)(),
        };
        const newStudent = await prisma.student.create({
            data: {
                ...studentData,
                eligible: true,
                supervisor: {
                    connect: { id: supervisorId },
                },
                coordinator: {
                    connect: { id: cooordinatorId },
                },
                organisation: {
                    connect: { id: organisationId },
                },
            },
            include: {
                coordinator: true,
                supervisor: true,
                organisation: true
            }
        });
        // Remove the password field for security reasons
        Reflect.deleteProperty(newStudent, "password");
        // Generate Access and Refreshed Token
        const accessToken = await (0, jwt_util_1.signAccessJWToken)({
            id: newStudent.id,
            email: newStudent.email,
            role: newStudent.user,
        });
        const refreshToken = await (0, jwt_util_1.signRefreshJWToken)({
            id: newStudent.id,
            email: newStudent.email,
            role: newStudent.user,
        });
        const encryptAccessToken = (0, crypto_utils_1.encryptToken)(accessToken);
        const encryptRefreshToken = (0, crypto_utils_1.encryptToken)(refreshToken);
        return {
            status: 201,
            message: "Created student successfully!",
            accessToken: encryptAccessToken,
            refreshToken: encryptRefreshToken,
            student: newStudent,
        };
    },
    // UPDATE STUDENT USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    updateStudent: async (_, { updateInput: input }, { prisma, auth }) => {
        var _a;
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const user = (0, getuser_util_1.default)(token);
        const { email: loginUserEmail, role } = user;
        // Authenticate user
        if (!user || loginUserEmail === '' || role === '')
            throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
        // Authorize the user to be either a Student or an Admin
        if (role !== 'Student' && role !== 'Admin')
            throw new apollo_server_express_1.AuthenticationError("Not authorized!");
        const { email, firstName, lastName, phone, address, level, gender, avatar, } = input;
        // Validate Input field
        const validate = student_joi_1.UpdateStudentInputSchema.validate(input);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Validation Error!");
        // Check if Email Already Exist
        const studentExist = await prisma.student.findUnique({
            where: { email },
        });
        if (!studentExist) {
            throw new apollo_server_express_1.AuthenticationError("Student doesn't exist!");
        }
        // Authorized Genuine Login User
        if (loginUserEmail !== email) {
            throw new apollo_server_express_1.AuthenticationError("Not authorized: not a genuine user!");
        }
        input.firstName = (0, titlecase_utl_1.default)(firstName);
        input.lastName = (0, titlecase_utl_1.default)(lastName);
        input.address = (0, titlecase_utl_1.default)(address);
        // Update Student User
        const data = {
            firstName,
            lastName,
            phone,
            address,
            level,
            gender,
            avatar,
        };
        const updatedStudent = await prisma.student.update({
            where: { email: loginUserEmail },
            data,
            include: {
                coordinator: true,
                supervisor: true,
                organisation: true
            }
        });
        // Generate Access and Refreshed Token
        const accessToken = await (0, jwt_util_1.signAccessJWToken)({
            id: updatedStudent.id,
            email: updatedStudent.email,
            role: updatedStudent.user,
        });
        const refreshToken = await (0, jwt_util_1.signRefreshJWToken)({
            id: updatedStudent.id,
            email: updatedStudent.email,
            role: updatedStudent.user,
        });
        return {
            status: 201,
            message: "Updated student successfully!",
            accessToken,
            refreshToken,
            student: updatedStudent,
        };
    },
    // DElETE STUDENT USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    deleteStudent: async (_, { emailInput }, { prisma, auth }) => {
        var _a;
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const user = (0, getuser_util_1.default)(token);
        const { email: loginUserEmail, role } = user;
        // Authenticate user
        if (!user || loginUserEmail === '' || role === '')
            throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
        // Authorize the user to be either a Student or an Admin
        if (role !== 'Student' && role !== 'Admin')
            throw new apollo_server_express_1.AuthenticationError("Not authorized!");
        const { email } = emailInput;
        // Validate Input field
        const validate = student_joi_1.DelStudentInputSchema.validate(emailInput);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Error! Invalid student ID!");
        // Check if Student Already Exist
        const studentExist = await prisma.student.findUnique({
            where: { email },
        });
        if (!studentExist) {
            throw new apollo_server_express_1.AuthenticationError("Student doesn't exist!");
        }
        // Authorized Genuine Login User
        if (loginUserEmail !== email) {
            throw new apollo_server_express_1.AuthenticationError("Not authorized: not a genuine user!");
        }
        // Delete Student
        const deletedStudent = await prisma.student.delete({
            where: { email: loginUserEmail },
        });
        const { id: deletedId, firstName, lastName, matricNo } = deletedStudent;
        return {
            status: 200,
            message: "Deleted student successfully!",
            id: deletedId,
            firstName,
            lastName,
            matricNo,
        };
    },
};
exports.default = studentMutations;
//# sourceMappingURL=mutations.js.map