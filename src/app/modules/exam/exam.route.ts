// src/app/modules/exam/exam.route.ts
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ExamValidation } from "./exam.validation";
import { ExamControllers } from "./exam.controller";

const router = express.Router();

router.post(
  "/create-exam",
  validateRequest(ExamValidation.createExamValidationSchema),
  ExamControllers.createExam,
);

router.get("/", ExamControllers.getAllExams);
router.get("/teacher-only-exams", ExamControllers.getExamsForTeacher);

router.get("/:examId", ExamControllers.getExamById);

router.patch(
  "/:examId",
  validateRequest(ExamValidation.updateExamValidationSchema),
  ExamControllers.updateExam,
);

router.delete("/:examId", ExamControllers.deleteExam);

export const ExamRoutes = router;
