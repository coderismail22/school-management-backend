import express from "express";
import { NoticeBannerControllers } from "./noticeBanner.controller";
import validateRequest from "../../middlewares/validateRequest";
import { NoticeBannerValidations } from "./noticeBanner.validation";

const router = express.Router();

router.post(
  "/create-notice-banner",
  validateRequest(NoticeBannerValidations.createNoticeBannerValidationSchema),
  NoticeBannerControllers.createNoticeBanner,
);

router.get("/:noticeBannerId", NoticeBannerControllers.getNoticeBanner);
router.get("/", NoticeBannerControllers.getAllNoticeBanners);

router.patch(
  "/update-notice-banner/:noticeBannerId",
  validateRequest(NoticeBannerValidations.updateNoticeBannerValidationSchema),
  NoticeBannerControllers.updateNoticeBanner,
);

router.delete("/:noticeBannerId", NoticeBannerControllers.deleteNoticeBanner);

export const NoticeBannerRoutes = router;
