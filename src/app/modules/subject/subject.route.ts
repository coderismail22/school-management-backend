// src/app/modules/subject/subject.route.ts
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SubjectValidations } from "./subject.validation";
import { SubjectController } from "./subject.controller";

const router = express.Router();

router.post(
  "/create-subject",
  validateRequest(SubjectValidations.createSubjectValidationSchema),
  SubjectController.createSubject,
);

router.get("/:subjectId", SubjectController.getSubjectById);

router.patch(
  "/:subjectId",
  validateRequest(SubjectValidations.updateSubjectValidationSchema),
  SubjectController.updateSubject,
);

router.delete("/:subjectId", SubjectController.deleteSubject);

router.get("/", SubjectController.getAllSubjects);

export const SubjectRoutes = router;
