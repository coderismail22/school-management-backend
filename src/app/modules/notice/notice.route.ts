import express from "express";
import { NoticeControllers } from "./notice.controller";
import { NoticeValidations } from "./notice.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/publish-notice",
  validateRequest(NoticeValidations.createNoticeValidationSchema),
  NoticeControllers.createNotice,
);

router.get("/:noticeId", NoticeControllers.getNotice);
router.get("/", NoticeControllers.getAllNotices);

router.patch(
  "/update-notice/:noticeId",
  validateRequest(NoticeValidations.updateNoticeValidationSchema),
  NoticeControllers.updateNotice,
);

router.delete("/:noticeId", NoticeControllers.deleteNotice);

export const NoticeRoutes = router;
