// src/app/modules/exam/exam.route.ts
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ExamValidation } from "./exam.validation";
import { ExamController } from "./exam.controller";

const router = express.Router();

router.post(
  "/create-exam",
  validateRequest(ExamValidation.createExamValidationSchema),
  ExamController.createExam
);

router.get("/", ExamController.getAllExams);

router.get("/:examId", ExamController.getExamById);

router.patch(
  "/:examId",
  validateRequest(ExamValidation.updateExamValidationSchema),
  ExamController.updateExam
);

router.delete("/:examId", ExamController.deleteExam);

export const ExamRoutes = router;
