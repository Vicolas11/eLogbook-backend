import Joi from "joi";

const { object, string } = Joi.types();

export const RegisterStudentInputSchema = object.keys({
  firstName: string.min(3).max(50).required(),
  lastName: string.min(3).max(50).required(),
  matricNo: string.min(3).max(50).required(),
  phone: string.min(5),
  address: string.min(10),
  institute: string.required(),
  department: string.required(),
  level: string.valid("ND1", "NC2", "L3", "L4"),
  gender: string.valid("Male", "Female"),
  place: string.required(),
  email: string.min(5).email().required(),
  password: string.min(6).required(),
  avatar: string,
  user: string.valid(
    "Admin",
    "Student",
    "Coordinator",
    "Supervisor",
    "Organisation"
  ),
});
