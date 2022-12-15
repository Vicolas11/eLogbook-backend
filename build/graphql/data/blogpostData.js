"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogPostByIDs = exports.getAllBlogPosts = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const context_1 = require("../context");
const getAllBlogPosts = async () => {
    const blogPosts = await context_1.prisma.blogPost.findMany();
    return blogPosts;
};
exports.getAllBlogPosts = getAllBlogPosts;
const getBlogPostByID = async (id) => {
    console.log(`Called getUserById for id: ${id}`);
    const blogPost = await context_1.prisma.blogPost.findUnique({ where: { id } });
    if (!blogPost)
        throw new apollo_server_express_1.AuthenticationError("BlogPost not found!");
    return blogPost;
};
const getBlogPostByIDs = (ids) => {
    return ids.map((id) => getBlogPostByID(id));
};
exports.getBlogPostByIDs = getBlogPostByIDs;
//# sourceMappingURL=blogpostData.js.map