// src/app/modules/exam/exam.route.ts
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ExamValidation } from "./exam.validation";
import { ExamControllers } from "./exam.controller";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-exam",
  auth(USER_ROLE.admin),
  validateRequest(ExamValidation.createExamValidationSchema),
  ExamControllers.createExam,
);

router.get("/", ExamControllers.getAllExams);
router.get("/teacher-only-exams", ExamControllers.getExamsForTeacher);

router.get("/:examId", ExamControllers.getExamById);

router.patch(
  "/:examId",
  auth(USER_ROLE.admin),
  validateRequest(ExamValidation.updateExamValidationSchema),
  ExamControllers.updateExam,
);

router.delete("/:examId", auth(USER_ROLE.admin), ExamControllers.deleteExam);

export const ExamRoutes = router;
