"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blogpostData_1 = require("../../data/blogpostData");
const blogPostQueries = {
    blog: async (_, { id }, { loaders }) => {
        const query = await loaders.blogPost.one(id);
        return query;
    },
    blogs: async () => {
        const query = await (0, blogpostData_1.getAllBlogPosts)();
        return query;
    },
};
exports.default = blogPostQueries;
//# sourceMappingURL=queries.js.map