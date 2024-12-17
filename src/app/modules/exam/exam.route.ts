import { Router } from "express";
import { ExamControllers } from "./exam.controller";
import { ExamValidations } from "./exam.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/create-exam",
  validateRequest(ExamValidations.createExamValidationSchema),
  ExamControllers.createExam,
);

router.get("/:examId", ExamControllers.getExam);
router.get("/", ExamControllers.getAllExams);

router.patch(
  "/update-exam/:examId",
  validateRequest(ExamValidations.updateExamValidationSchema),
  ExamControllers.updateExam,
);

router.delete("/:examId", ExamControllers.deleteExam);

export const ExamRoutes = router;
