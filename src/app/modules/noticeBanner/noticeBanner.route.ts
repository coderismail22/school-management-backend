import express from "express";
import { NoticeBannerControllers } from "./noticeBanner.controller";
import validateRequest from "../../middlewares/validateRequest";
import { NoticeBannerValidations } from "./noticeBanner.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-notice-banner",
  auth(USER_ROLE.admin),
  validateRequest(NoticeBannerValidations.createNoticeBannerValidationSchema),
  NoticeBannerControllers.createNoticeBanner,
);

router.get("/:noticeBannerId", NoticeBannerControllers.getNoticeBanner);
router.get("/", NoticeBannerControllers.getAllNoticeBanners);

router.patch(
  "/update-notice-banner/:noticeBannerId",
  auth(USER_ROLE.admin),
  validateRequest(NoticeBannerValidations.updateNoticeBannerValidationSchema),
  NoticeBannerControllers.updateNoticeBanner,
);

router.delete(
  "/:noticeBannerId",
  auth(USER_ROLE.admin),
  NoticeBannerControllers.deleteNoticeBanner,
);

export const NoticeBannerRoutes = router;
