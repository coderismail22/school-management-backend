// src/app/modules/subject/subject.validation.ts
import { z } from "zod";

const createSubjectValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Subject name is required"),
    code: z.string().min(1, "Subject code is required"),
    year: z.string().min(1, "Year is required"),
    version: z.string().min(1, "Version is required"),
    class: z.string().min(1, "Class is required"),
    shift: z.enum(["Morning", "Day", "Evening"], {
      required_error: "Shift is required",
    }),
    section: z.string().min(1, "Section is required"),
    group: z
      .enum(["Science", "Commerce", "Arts", "NA"])
      .optional()
      .default("NA"),
    hasPlainMark: z.boolean().optional(),
    hasMCQ: z.boolean().optional(),
    hasCQ: z.boolean().optional(),
    hasPractical: z.boolean().optional(),
    mcqMark: z.number().optional(),
    cqMark: z.number().optional(),
    practicalMark: z.number().optional(),
    plainMark: z.number().optional(),
    totalMark: z.number().min(1, "totalMark is required"),
    subjectTeacher: z.string().min(1, "Teacher ID is required"),
  }),
});

const updateSubjectValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    code: z.string().optional(),
    year: z.string().optional(),
    version: z.string().optional(),
    class: z.string().optional(),
    shift: z.enum(["Morning", "Day", "Evening"]).optional(),
    section: z.string().optional(),
    group: z.enum(["Science", "Commerce", "Arts", "NA"]).optional(),
    hasPlainMark: z.boolean().optional(),
    hasMCQ: z.boolean().optional(),
    hasCQ: z.boolean().optional(),
    hasPractical: z.boolean().optional(),
    mcqMark: z.number().optional(),
    cqMark: z.number().optional(),
    practicalMark: z.number().optional(),
    plainMark: z.number().optional(),
    totalMark: z.number().optional(),
    subjectTeacher: z.string().optional(),
  }),
});

export const SubjectValidations = {
  createSubjectValidationSchema,
  updateSubjectValidationSchema,
};
