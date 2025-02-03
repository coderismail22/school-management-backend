// src/app/modules/exam/exam.validation.ts
import { z } from "zod";

const examSubjectSchema = z.object({
  name: z.string().min(1, "Subject name is required"),
  code: z.string().min(1, "Subject code is required"),
  year: z.string().min(1, "Year is required"),
  version: z.string().min(1, "Version is required"),
  class: z.string().min(1, "Class is required"),
  shift: z.enum(["Morning", "Day", "Evening"]),
  section: z.string().min(1, "Section is required"),
  group: z.enum(["Science", "Commerce", "Arts", "NA"]).optional(),
  hasPlainMarks: z.boolean().optional(),
  hasMCQ: z.boolean().optional(),
  hasCQ: z.boolean().optional(),
  hasPractical: z.boolean().optional(),
  mcqMarks: z.number().optional(),
  cqMarks: z.number().optional(),
  practicalMarks: z.number().optional(),
  plainMarks: z.number().optional(),
  totalMarks: z.number().min(1, "Total marks required"),
  subjectTeacher: z.string().min(1, "Teacher ID is required"),
});

// For creating a new exam
const createExamValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Exam name is required"),
    year: z.string().min(1, "Year is required"),
    version: z.string().min(1, "Version is required"),
    class: z.string().min(1, "Class is required"),
    shift: z.enum(["Morning", "Day", "Evening"], {
      required_error: "Shift is required",
    }),
    section: z.string().min(1, "Section is required"),
    group: z.enum(["Science", "Commerce", "Arts", "NA"]).optional(),
    subjects: z.array(examSubjectSchema).optional(),
    // you can add "students" array for direct registration if you want:
    students: z.array(z.string()).optional(),
  }),
});

const updateExamValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    year: z.string().optional(),
    version: z.string().optional(),
    class: z.string().optional(),
    shift: z.enum(["Morning", "Day", "Evening"]).optional(),
    section: z.string().optional(),
    group: z.enum(["Science", "Commerce", "Arts", "NA"]).optional(),
    subjects: z.array(examSubjectSchema).optional(),
    students: z.array(z.string()).optional(),
  }),
});

export const ExamValidation = {
  createExamValidationSchema,
  updateExamValidationSchema,
};
