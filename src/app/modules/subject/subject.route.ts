// src/app/modules/subject/subject.route.ts
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SubjectValidations } from "./subject.validation";
import { SubjectController } from "./subject.controller";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-subject",
  auth(USER_ROLE.admin),
  validateRequest(SubjectValidations.createSubjectValidationSchema),
  SubjectController.createSubject,
);

router.get("/:subjectId", SubjectController.getSubjectById);

router.patch(
  "/:subjectId",
  validateRequest(SubjectValidations.updateSubjectValidationSchema),
  SubjectController.updateSubject,
);

router.delete(
  "/:subjectId",
  auth(USER_ROLE.admin),
  SubjectController.deleteSubject,
);

router.get("/", auth(USER_ROLE.admin), SubjectController.getAllSubjects);

export const SubjectRoutes = router;
