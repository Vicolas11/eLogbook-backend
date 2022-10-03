import Joi from "joi";

export const EligibleInputSchema = Joi.object({
  level: Joi.string().valid("ND1", "NC2", "L3", "L4").required(),
  matricNo: Joi.string()
    .min(5)
    .regex(/^([A-Z0-9]+){8}((,\s)([A-Z0-9]+){7})*([A-Z0-9]+)$/)
    .required().uppercase(),
  email1: Joi.string().email().required(),
  email2: Joi.string().email().required()
});

export const UpdateEligibleInputSchema = Joi.object({
  id: Joi.string().min(5).required(),
  level: Joi.string().valid("ND1", "NC2", "L3", "L4").required(),
  email1: Joi.string().email().required()
});

export const DelEligibleInputSchema = Joi.object({
  id: Joi.string().min(5).required(),
});
