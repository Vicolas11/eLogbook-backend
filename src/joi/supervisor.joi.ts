import Joi from "joi";

const { object, string } = Joi.types();

export const RegisterSupervisorInputSchema = object.keys({
  firstName: string.min(3).max(50).required(),
  lastName: string.min(3).max(50).required(),
  staffID: string.min(3).max(50).required(),
  phone: string.min(5),
  institute: string.required(),
  department: string.required(),
  gender: string.valid("Male", "Female"),
  email: string.min(5).email().required(),
  password: string.min(6).required(),
  avatar: string.length(38).regex(/[.jpg]$/),
});

export const UpdateSupervisorInputSchema = object.keys({
  firstName: string.min(3).max(50).required(),
  lastName: string.min(3).max(50).required(),
  phone: string.min(5),
  email: string.min(5).email().required(),
  gender: string.valid("Male", "Female"),
  avatar: string.length(38).regex(/[.jpg]$/),
});

export const DeleteSupervisorInputSchema = object.keys({
  email: string.min(5).email().required(),
});
