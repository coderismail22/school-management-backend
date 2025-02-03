// src/app/modules/examRegistration/examRegistration.route.ts
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ExamRegistrationValidation } from "./examRegistration.validation";
import { ExamRegistrationControllers } from "./examRegistration.controller";

const router = express.Router();

// Bulk register
router.post(
  "/bulk-register",
  validateRequest(ExamRegistrationValidation.bulkRegisterValidationSchema),
  ExamRegistrationControllers.bulkRegisterStudents,
);

// Query registrations (by examId or studentId)
router.get(
  "/",
  validateRequest(ExamRegistrationValidation.getRegistrationsValidationSchema),
  ExamRegistrationControllers.getRegistrations,
);

// Delete a specific registration
router.delete(
  "/:registrationId",
  ExamRegistrationControllers.deleteExamRegistration,
);

export const ExamRegistrationRoutes = router;
