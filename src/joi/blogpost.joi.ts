import Joi from "joi";

export const BlogPostInputSchema = Joi.object({
  title: Joi.string().min(5).required(),
  content: Joi.string().min(30).required(),
  image: Joi.string().min(38).regex(/[.jpg]$/),
});

export const DelBlogPostInputSchema = Joi.object({
  email: Joi.string().min(5).email().required(),
});
