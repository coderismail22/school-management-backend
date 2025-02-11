import express from "express";
import { NoticeControllers } from "./notice.controller";
import { NoticeValidations } from "./notice.validation";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/publish-notice",
  auth(USER_ROLE.admin),
  validateRequest(NoticeValidations.createNoticeValidationSchema),
  NoticeControllers.createNotice,
);

router.get("/:noticeId", NoticeControllers.getNotice);
router.get("/", NoticeControllers.getAllNotices);

router.patch(
  "/update-notice/:noticeId",
  auth(USER_ROLE.admin),
  validateRequest(NoticeValidations.updateNoticeValidationSchema),
  NoticeControllers.updateNotice,
);

router.delete(
  "/:noticeId",
  auth(USER_ROLE.admin),
  NoticeControllers.deleteNotice,
);

export const NoticeRoutes = router;
