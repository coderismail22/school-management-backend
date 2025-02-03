// src/app/modules/examResult/examResult.route.ts
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ExamResultValidation } from "./examResult.validation";
import { ExamResultControllers } from "./examResult.controller";

const router = express.Router();

// Create/Update marks for a single student
router.post(
  "/create-or-update",
  validateRequest(ExamResultValidation.createOrUpdateResultSchema),
  ExamResultControllers.createOrUpdateResult
);

// Get single result by _id
router.get("/:id", ExamResultControllers.getSingleResult);

// Get multiple results with query filters
router.get("/", ExamResultControllers.getAllResults);

export const ExamResultRoutes = router;
