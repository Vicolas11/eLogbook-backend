import Joi from "joi";

export const LoginInputSchema = Joi.object({
  email: Joi.string().min(5).email().required(),
  password: Joi.string().min(6).required(),
});