import { z } from "zod";

const createStudentValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    rollNumber: z.string().min(1, "Roll Number is required"),
    classLevel: z.number().min(1).max(12),
    section: z.string().min(1, "Section is required"),
    shift: z.enum(["Morning", "Evening"]).optional(),
    group: z.enum(["Science", "Commerce", "Arts"]).optional(),
    year: z.number().min(2000, "Year is required"),
  }),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    rollNumber: z.string().optional(),
    classLevel: z.number().min(1).max(12).optional(),
    section: z.string().optional(),
    shift: z.enum(["Morning", "Evening"]).optional(),
    group: z.enum(["Science", "Commerce", "Arts"]).optional(),
    year: z.number().optional(),
  }),
});

export const StudentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
