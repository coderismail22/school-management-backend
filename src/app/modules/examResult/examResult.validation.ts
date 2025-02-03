// src/app/modules/examResult/examResult.validation.ts
import { z } from "zod";

const marksBreakdownSchema = z.object({
  mcqMark: z.number().optional(),
  cqMark: z.number().optional(),
  practicalMark: z.number().optional(),
  plainMark: z.number().optional(),
  totalMark: z.number().optional(),
});

const createOrUpdateResultSchema = z.object({
  body: z.object({
    examId: z.string().min(1, "Exam ID is required"),
    examSubjectId: z.string().min(1, "examSubjectId is required"), 
    studentId: z.string().min(1, "Student ID is required"),
    teacherId: z.string().min(1, "Teacher ID is required"),
    marks: marksBreakdownSchema,
  }),
});

export const ExamResultValidation = {
  createOrUpdateResultSchema,
};
