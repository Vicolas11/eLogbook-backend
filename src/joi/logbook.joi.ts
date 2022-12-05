import Joi from "joi";

export const LogbookInputSchema = Joi.object({
  day: Joi.date().required(),
  actId: Joi.string().length(13),
  title: Joi.string().required(),
  description: Joi.string().required(),
  label: Joi.string().valid("indigo", "gray", "green", "blue", "red").required(),
  diagram: Joi.string().min(30).regex(/[.jpg]$/),
  email: Joi.string().min(5).email().required(),
});

export const UpdateLogbookInputSchema = Joi.object({
  id: Joi.string().min(5),
  actId: Joi.string().length(13),
  day: Joi.date().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  label: Joi.string().valid("indigo", "gray", "green", "blue", "red").required(),
  diagram: Joi.string().min(30).regex(/[.jpg]$/),
  email: Joi.string().min(5).email().required()
});

export const DelLogbookInputSchema = Joi.object({
  id: Joi.string().min(5),
  actId: Joi.string().length(13).required(),
  email: Joi.string().min(5).email().required()
});
