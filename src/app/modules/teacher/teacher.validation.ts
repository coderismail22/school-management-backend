import { z } from "zod";

const AssignedSubjectSchema = z.object({
  subjectId: z.string().min(1, "Subject ID is required"),
  subjectName: z.string().min(1, "Subject Name is required"),
  group: z.string().optional(),
});

const AssignedClassSchema = z.object({
  classId: z.string().min(1, "Class ID is required"),
  className: z.string().min(1, "Class Name is required"),
  section: z.string().min(1, "Section is required"),
  shift: z.string().optional(),
});

const createTeacherValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Teacher name is required"),
    teacherId: z.string().min(1, "Teacher ID is required"),
    profileImg: z.string().min(1, "Profile image is required"),
    email: z.string().email("Invalid email format"),
    address: z.string().min(1, "Address is required"),
    phone: z.string().min(1, "Phone number is required"),
    bloodGroup: z.string().min(1, "Blood group is required"),
    salary: z.number().min(0, "Salary must be a positive number"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    assignedSubjects: z.array(AssignedSubjectSchema).optional(),
    assignedClasses: z.array(AssignedClassSchema).optional(),
  }),
});

const updateTeacherValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    teacherId: z.string().optional(),
    profileImg: z.string().optional(),
    email: z.string().email().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    bloodGroup: z.string().optional(),
    salary: z.number().min(0).optional(),
    password: z.string().optional(),
    assignedSubjects: z.array(AssignedSubjectSchema).optional(),
    assignedClasses: z.array(AssignedClassSchema).optional(),
  }),
});

export const TeacherValidations = {
  createTeacherValidationSchema,
  updateTeacherValidationSchema,
};
