import { Router } from "express";
import { StudentControllers } from "./student.controller";
import { StudentValidations } from "./student.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/create-student",
  validateRequest(StudentValidations.createStudentValidationSchema),
  StudentControllers.createStudent
);

router.get("/:studentId", StudentControllers.getStudent);
router.get("/", StudentControllers.getAllStudents);

router.patch(
  "/update-student/:studentId",
  validateRequest(StudentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent
);

router.delete("/:studentId", StudentControllers.deleteStudent);

export const StudentRoutes = router;
