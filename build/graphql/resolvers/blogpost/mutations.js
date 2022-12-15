"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blogpost_joi_1 = require("../../../joi/blogpost.joi");
const apollo_server_express_1 = require("apollo-server-express");
const crypto_utils_1 = require("../../../utils/crypto.utils");
const titlecase_utl_1 = __importDefault(require("../../../utils/titlecase.utl"));
const getuser_util_1 = __importDefault(require("../../../utils/getuser.util"));
const uuid_1 = require("uuid");
const blogPostMutations = {
    // CREATE BLOGPOST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    blogPost: async (_, { registerInput: input }, { prisma, auth }) => {
        var _a;
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const user = (0, getuser_util_1.default)(token);
        const { email: loginUserEmail, role } = user;
        // Authenticate user
        if (!user || loginUserEmail === '' || role === '')
            throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
        // Authorize the user to be an Admin
        if (role !== 'Admin')
            throw new apollo_server_express_1.AuthenticationError("Not authorized!");
        const { title: tit } = input;
        // Validate Input field
        const validate = blogpost_joi_1.BlogPostInputSchema.validate(input);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Validation Error!");
        const title = (0, titlecase_utl_1.default)(tit);
        // Check if BlogPost Title Already Exist
        const blogPostExist = await prisma.blogPost.findUnique({
            where: { title },
        });
        if (blogPostExist)
            throw new apollo_server_express_1.AuthenticationError("BlogPost with this title already existed!");
        // Create New BlogPost User
        const data = {
            ...input,
            id: (0, uuid_1.v4)(),
        };
        const newBlogPost = await prisma.blogPost.create({ data });
        return {
            status: 201,
            message: "Created blog post successfully!",
            blogpost: newBlogPost,
        };
    },
    // UPDATE BLOGPOST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    updateBlogPost: async (_, { input }, { prisma, auth }) => {
        var _a;
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const user = (0, getuser_util_1.default)(token);
        const { email: loginUserEmail, role } = user;
        // Authenticate user
        if (!user || loginUserEmail === '' || role === '')
            throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
        // Authorize the user to be either a Coordinator or an Admin
        if (role !== 'Admin')
            throw new apollo_server_express_1.AuthenticationError("Not authorized!");
        const { id, title: tit, content, image } = input;
        // Validate Input field
        const validate = blogpost_joi_1.BlogPostInputSchema.validate(input);
        const { error } = validate;
        const title = (0, titlecase_utl_1.default)(tit);
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Validation Error!");
        // Check if BlogPost Already Exist
        const blogPostExist = await prisma.blogPost.findFirst({
            where: { OR: [{ id }, { title }] },
        });
        if (blogPostExist) {
            throw new apollo_server_express_1.AuthenticationError("BlogPost already exist!");
        }
        // Update BlogPost User
        const data = { title, content, image };
        const updatedBlogPost = await prisma.blogPost.update({
            where: { id },
            data,
        });
        return {
            status: 201,
            message: "Updated blog post successfully!",
            blogpost: updatedBlogPost,
        };
    },
    // DElETE BLOGPOST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    deleteBlogPost: async (_, { input }, { prisma, auth }) => {
        var _a;
        const token = (0, crypto_utils_1.decryptToken)(auth);
        const user = (0, getuser_util_1.default)(token);
        const { email: loginUserEmail, role } = user;
        // Authenticate user
        if (!user || loginUserEmail === '' || role === '')
            throw new apollo_server_express_1.AuthenticationError("User not authenticated!");
        // Authorize the user to be either a Coordinator or an Admin
        if (role !== 'Coordinator' && role !== 'Admin')
            throw new apollo_server_express_1.AuthenticationError("Not authorized!");
        const { id: blogID } = input;
        // Validate Input field
        const validate = blogpost_joi_1.DelBlogPostInputSchema.validate(input);
        const { error } = validate;
        if (error)
            throw new apollo_server_express_1.ValidationError(((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.map((err) => err.message)) ||
                "Error! Invalid blogPost ID!");
        // Check if BlogPost Already Exist
        const blogPostExist = await prisma.blogPost.findUnique({
            where: { id: blogID },
        });
        if (!blogPostExist) {
            throw new apollo_server_express_1.AuthenticationError("Blog post doesn't exist!");
        }
        // Delete BlogPost
        const deletedBlogPost = await prisma.blogPost.delete({
            where: { id: blogID },
        });
        return {
            status: 200,
            message: "Deleted blog post successfully!",
            blogpost: deletedBlogPost,
        };
    },
};
exports.default = blogPostMutations;
//# sourceMappingURL=mutations.js.map