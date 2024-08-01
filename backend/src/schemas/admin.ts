import { Course, Designation, Gender } from "@prisma/client";
import { z } from "zod";
import validator from "validator";

export const EmployeeFindSchema = z.object({
  id: z.number(),
});

const ACCEPTED_IMAGE_TYPES = ["image/jpg", "image/png"];

export const EmployeeEditSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  mobile: z.string().refine(validator.isMobilePhone).optional(),
  designation: z.nativeEnum(Designation).optional(),
  gender: z.nativeEnum(Gender).optional(),
  course: z.nativeEnum(Course).optional(),
});

export const EmployeeCreateSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  mobile: z.string().refine(validator.isMobilePhone),
  designation: z.nativeEnum(Designation),
  gender: z.nativeEnum(Gender),
  course: z.nativeEnum(Course),
});
