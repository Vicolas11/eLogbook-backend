import Joi, { ref } from "joi";

const { object, string } = Joi.types();

export const changePswInputSchema = object.keys({
  password: string.min(6).required(),
  con_password: ref('password'),
  new_password: string.min(6).required(),
}).with('password', 'con_password');