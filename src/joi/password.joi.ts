import Joi from "joi";

export const changePswInputSchema = Joi.object({
  id: Joi.string().min(36),
  password: Joi.string().min(6).required(),
  new_password: Joi.string().min(6).required(),
  con_password: Joi.valid(Joi.ref("new_password")).messages({
    "any.only": "New and Confirm Passwords Must Match!",
  }),
});
