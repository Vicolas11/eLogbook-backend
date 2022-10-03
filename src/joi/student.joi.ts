import Joi from "joi";

export const StudentInputSchema = Joi.object({
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  matricNo: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(5),
  address: Joi.string().min(10),
  institute: Joi.string().required(),
  department: Joi.string().required(),
  level: Joi.string().valid("ND1", "NC2", "L3", "L4"),
  gender: Joi.string().valid("Male", "Female"),
  place: Joi.string().email().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string().min(30).regex(/[.jpg]$/).required(),
});

export const UpdateStudentInputSchema = Joi.object({
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(5),
  email: Joi.string().email().required(),
  address: Joi.string().min(10),
  level: Joi.string().valid("ND1", "NC2", "L3", "L4"),
  gender: Joi.string().valid("Male", "Female"),
  avatar: Joi.string().min(30).regex(/[.jpg]$/).required(),
});

export const DelStudentInputSchema = Joi.object({
  email: Joi.string().min(5).email().required(),
});
