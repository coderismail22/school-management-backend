// src/app/modules/examRegistration/examRegistration.route.ts
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ExamRegistrationValidation } from "./examRegistration.validation";
import { ExamRegistrationControllers } from "./examRegistration.controller";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";

const router = express.Router();

// Bulk register
router.post(
  "/bulk-register",
  auth(USER_ROLE.admin),
  validateRequest(ExamRegistrationValidation.bulkRegisterValidationSchema),
  ExamRegistrationControllers.bulkRegisterStudents,
);

// Query registrations multiple document output (by examId or studentId)
router.get(
  "/",
  // validateRequest(ExamRegistrationValidation.getRegistrationsValidationSchema),
  ExamRegistrationControllers.getRegistrations,
);

// Query registrations multiple document output (by examId or studentId)
router.get(
  "/exam-specific-registrations/:examId",
  // validateRequest(ExamRegistrationValidation.getRegistrationsValidationSchema),
  ExamRegistrationControllers.getSpecificExamRegistrations,
);

// Get a single document
router.get(
  "/get-registration",
  // validateRequest(ExamRegistrationValidation.getRegistrationsValidationSchema),
  ExamRegistrationControllers.getRegistration,
);

// Delete a specific registration
router.delete(
  "/:registrationId",
  auth(USER_ROLE.admin),
  ExamRegistrationControllers.deleteExamRegistration,
);

export const ExamRegistrationRoutes = router;
