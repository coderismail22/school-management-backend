import { z } from "zod";

const createAdministrationValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    designation: z.string().min(1, "Designation is required"),
    photo: z.string().url("Invalid photo URL format"),
    category: z.enum(["Governing Body", "Teacher", "Staff"]),
    linkedIn: z.string().optional(),
    fb: z.string().optional(),
    x: z.string().optional(),
    youtube: z.string().optional(),
  }),
});

const updateAdministrationValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    designation: z.string().optional(),
    photo: z.string().url().optional(),
    category: z.enum(["Governing Body", "Teacher", "Staff"]).optional(),
    linkedIn: z.string().url().optional(),
    fb: z.string().url().optional(),
    x: z.string().url().optional(),
    youtube: z.string().url().optional(),
  }),
});

export const AdministrationValidations = {
  createAdministrationValidationSchema,
  updateAdministrationValidationSchema,
};
