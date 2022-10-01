import Joi from "joi";

export const changePswInputSchema = Joi.object({
  password: Joi.string().min(6).required(),
  con_password: Joi.ref('password'),
  new_password: Joi.string().min(6).required(),
}).with('password', 'con_password');