import Joi from "joi";

export const FileInputSchema = Joi.object({
  type: Joi.string()
    .valid("logo", "chats", "avatar", "diagrams", "blogposts")
    .required(),
});

export const FileUpdateInputSchema = Joi.object({
  id: Joi.string().min(5).required(),
  type: Joi.string()
    .valid("logo", "chats", "avatar", "diagrams", "blogposts")
    .required(),
});
