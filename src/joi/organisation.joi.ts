import Joi, { number } from "joi";

const { object, string } = Joi.types();

export const RegisterOrganisationInputSchema = object.keys({
  name: string.min(5).max(150).required(),
  sector: string.valid(
    "ICT",
    "Healthcare",
    "Agriculture",
    "Transportation",
    "Energy",
    "Commercial",
    "Financial",
    "Aviation",
    "Construction",
    "Manufacturing",
    "Education",
    "Fashion",
    "Logistics",
    "Tourism",
    "Telecommunication",
    "Entertainment",
    "Legal",
    "Consultancy",
    "Religion",
    "Oil",
    "Others"
  ).required(),
  phone: string.min(5).max(18),
  address: string.min(10).required(),
  employees: number(),
  email: string.min(5).email().required(),
  password: string.min(6).required(),
  logo: string.length(38).regex(/[.jpg]$/),
});

export const UpdateOrganisationInputSchema = object.keys({
  email: string.min(5).email().required(),
  name: string.min(5).max(150).required(),
  sector: string.valid(
    "ICT",
    "Healthcare",
    "Agriculture",
    "Transportation",
    "Energy",
    "Commercial",
    "Financial",
    "Aviation",
    "Construction",
    "Manufacturing",
    "Education",
    "Fashion",
    "Logistics",
    "Tourism",
    "Telecommunication",
    "Entertainment",
    "Legal",
    "Consultancy",
    "Religion",
    "Oil",
    "Others"
  ).required(),
  phone: string.min(5).max(18),
  address: string.min(10).required(),
  employees: number(),
  logo: string.length(38).regex(/[.jpg]$/),
});

export const DeleteOrganisationInputSchema = object.keys({
  email: string.min(5).email().required(),
});
