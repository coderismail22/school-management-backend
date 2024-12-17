import { z } from "zod";

const createTeacherValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Teacher name is required"),
    email: z.string().email("Invalid email format"),
    assignedSubjects: z
      .array(
        z.object({
          subjectId: z.string().min(1),
          subjectName: z.string().min(1),
          group: z.string().optional(),
        })
      )
      .optional(),
    assignedClasses: z
      .array(
        z.object({
          classId: z.string().min(1),
          className: z.string().min(1),
          section: z.string().min(1),
          shift: z.string().optional(),
        })
      )
      .optional(),
  }),
});

const updateTeacherValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    assignedSubjects: z.array(
      z.object({
        subjectId: z.string().optional(),
        subjectName: z.string().optional(),
        group: z.string().optional(),
      })
    ).optional(),
    assignedClasses: z.array(
      z.object({
        classId: z.string().optional(),
        className: z.string().optional(),
        section: z.string().optional(),
        shift: z.string().optional(),
      })
    ).optional(),
  }),
});

export const TeacherValidations = {
  createTeacherValidationSchema,
  updateTeacherValidationSchema,
};
