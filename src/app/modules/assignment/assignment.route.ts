import { Router } from "express";
import { AssignmentControllers } from "./assignment.controller";
import { AssignmentValidations } from "./assignment.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/create-assignment",
  validateRequest(AssignmentValidations.createAssignmentSchema),
  AssignmentControllers.createAssignment,
);

router.get("/:assignmentId", AssignmentControllers.getAssignment);
router.get("/", AssignmentControllers.getAllAssignments);

router.patch(
  "/update-assignment/:assignmentId",
  validateRequest(AssignmentValidations.updateAssignmentSchema),
  AssignmentControllers.updateAssignment,
);

router.delete("/:assignmentId", AssignmentControllers.deleteAssignment);

export const AssignmentRoutes = router;
