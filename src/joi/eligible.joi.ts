import Joi from "joi";

export const EligibleInputSchema = Joi.object({
  institute: Joi.string().required(),
  department: Joi.string().required(),
  level: Joi.string().valid("ND1", "NC2", "L3", "L4").required(),
  supervisor: Joi.string().min(5).max(60).required(),
  matricNo: Joi.string()
    .min(5)
    .regex(/^([A-Z0-9]+){8}((,\s)([A-Z0-9]+){7})*([A-Z0-9]+)$/)
    .required().uppercase()
});

export const UpdateEligibleInputSchema = Joi.object({
  id: Joi.string().min(5).required(),
  level: Joi.string().valid("ND1", "NC2", "L3", "L4").required(),
  supervisor: Joi.string().min(5).max(60).required(),
  matricNo: Joi.string()
    .min(5)
    .regex(/^([A-Z0-9]+){8}((,\s)([A-Z0-9]+){7})*([A-Z0-9]+)$/)
    .required().uppercase()
});

export const DelEligibleInputSchema = Joi.object({
  id: Joi.string().min(5).required(),
});
