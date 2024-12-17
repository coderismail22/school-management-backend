import { z } from "zod";

const examSubjectSchema = z.object({
  subjectId: z.string().min(1),
  hasMCQ: z.boolean(),
  hasCQ: z.boolean(),
  hasPractical: z.boolean(),
  mcqMarks: z.number().optional(),
  cqMarks: z.number().optional(),
  practicalMarks: z.number().optional(),
  totalMarks: z.number().positive(),
});

const createExamValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Exam name is required"),
    year: z.number().min(2000).max(2100, "Year must be valid"),
    classLevel: z
      .number()
      .min(1)
      .max(12, "Class level must be between 1 and 12"),
    subjects: z.array(examSubjectSchema).nonempty("Subjects are required"),
  }),
});

const updateExamValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    year: z.number().optional(),
    classLevel: z.number().optional(),
    subjects: z.array(examSubjectSchema).optional(),
  }),
});

export const ExamValidations = {
  createExamValidationSchema,
  updateExamValidationSchema,
};
