import { z } from "zod";

const createNoticeBannerValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
  }),
});

const updateNoticeBannerValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const NoticeBannerValidations = {
  createNoticeBannerValidationSchema,
  updateNoticeBannerValidationSchema,
};
