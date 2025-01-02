import { z } from "zod";

const createNoticeValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    publishDate: z.string().min(1, "Publish date is required"),
    category: z.string().min(1, "Category is required"),
    noticePdfUrl: z.string().url("Invalid PDF URL format"),
  }),
});

const updateNoticeValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    publishDate: z.string().optional(),
    category: z.string().optional(),
    noticePdfUrl: z.string().url("Invalid PDF URL format").optional(),
  }),
});

export const NoticeValidations = {
  createNoticeValidationSchema,
  updateNoticeValidationSchema,
};
