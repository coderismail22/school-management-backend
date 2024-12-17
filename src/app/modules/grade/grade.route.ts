import { Router } from "express";
import { GradeControllers } from "./grade.controller";
import { GradeValidations } from "./grade.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/create-grade",
  validateRequest(GradeValidations.createGradeSchema),
  GradeControllers.createGrade
);

router.get("/:gradeId", GradeControllers.getGrade);
router.get("/", GradeControllers.getAllGrades);

router.patch(
  "/update-grade/:gradeId",
  validateRequest(GradeValidations.updateGradeSchema),
  GradeControllers.updateGrade
);

router.delete("/:gradeId", GradeControllers.deleteGrade);

export const GradeRoutes = router;
