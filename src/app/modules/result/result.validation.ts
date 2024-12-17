import { z } from "zod";

const subjectResultSchema = z.object({
  subjectId: z.string().min(1, "Subject ID is required"),
  marks: z.object({
    mcq: z.number().optional(),
    cq: z.number().optional(),
    practical: z.number().optional(),
    total: z.number().positive("Total marks are required"),
  }),
  grade: z.string().min(1, "Grade is required"),
  gradePoint: z.number().min(0, "Grade point must be positive"),
});

const resultSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  examId: z.string().min(1, "Exam ID is required"),
  totalMarks: z.number().positive("Total marks are required"),
  grade: z.string().min(1, "Grade is required"),
  gradePoint: z.number().min(0, "Grade point must be positive"),
  subjectResults: z.array(subjectResultSchema),
});

export const ResultValidations = {
  createResultSchema: z.object({ body: resultSchema }),
  updateResultSchema: z.object({
    body: resultSchema.partial(),
  }),
};
