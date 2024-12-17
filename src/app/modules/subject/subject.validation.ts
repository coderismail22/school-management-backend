import { z } from "zod";

const createSubjectValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Subject name is required"),
    subjectCode: z.string().min(1, "Subject code is required"),
    hasMCQ: z.boolean(),
    hasCQ: z.boolean(),
    hasPractical: z.boolean(),
    mcqMarks: z.number().optional(),
    cqMarks: z.number().optional(),
    practicalMarks: z.number().optional(),
    totalMarks: z.number().positive("Total marks must be a positive number"),
    group: z.enum(["Science", "Commerce", "Arts"]).optional(),
    classLevel: z.number().min(1).max(12, "Class level must be between 1 and 12"),
  }),
});

const updateSubjectValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    subjectCode: z.string().optional(),
    hasMCQ: z.boolean().optional(),
    hasCQ: z.boolean().optional(),
    hasPractical: z.boolean().optional(),
    mcqMarks: z.number().optional(),
    cqMarks: z.number().optional(),
    practicalMarks: z.number().optional(),
    totalMarks: z.number().optional(),
    group: z.enum(["Science", "Commerce", "Arts"]).optional(),
    classLevel: z.number().optional(),
  }),
});

export const SubjectValidations = {
  createSubjectValidationSchema,
  updateSubjectValidationSchema,
};
