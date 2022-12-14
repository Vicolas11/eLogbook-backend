import { getAllBlogPosts } from "../../data/blogpostData";
import { QueryResolvers, Blog } from "../../generated";

const blogPostQueries: QueryResolvers = {
  blog: async (_, { id }, { loaders }) => {
    const query = await loaders.blogPost.one(id);
    return query as Blog;
  },

  blogs: async () => {
    const query = await getAllBlogPosts();
    return query as Array<Blog>;
  },
};

export default blogPostQueries;
