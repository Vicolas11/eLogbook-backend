import Joi from "joi";

export const FileInputSchema = Joi.object({
  file: Joi.any(),
  type: Joi.string()
    .valid("logo", "chats", "avatar", "diagrams", "blogposts")
    .required(),
});

export const FileUpdateInputSchema = Joi.object({
  id: Joi.string().min(36).required(),
  actId: Joi.string().length(13),
  file: Joi.any(),
  type: Joi.string()
    .valid("logo", "chats", "avatar", "diagrams", "blogposts")
    .required(),
});

export const FileDelInputSchema = Joi.object({
  id: Joi.string().min(36).required(),
  actId: Joi.string().length(13),
  type: Joi.string().valid("logo", "chats", "avatar", "diagrams", "blogposts"),
});

export const CloudDelInputSchema = Joi.object({
  oldImgURL: Joi.string().min(90).required()
});
