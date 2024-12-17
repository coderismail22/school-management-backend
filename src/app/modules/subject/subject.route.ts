import { Router } from "express";
import { SubjectControllers } from "./subject.controller";
import { SubjectValidations } from "./subject.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/create-subject",
  validateRequest(SubjectValidations.createSubjectValidationSchema),
  SubjectControllers.createSubject
);

router.get("/:subjectId", SubjectControllers.getSubject);
router.get("/", SubjectControllers.getAllSubjects);

router.patch(
  "/update-subject/:subjectId",
  validateRequest(SubjectValidations.updateSubjectValidationSchema),
  SubjectControllers.updateSubject
);

router.delete("/:subjectId", SubjectControllers.deleteSubject);

export const SubjectRoutes = router;
