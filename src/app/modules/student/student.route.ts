import { Router } from "express";
import { StudentControllers } from "./student.controller";
import { StudentValidations } from "./student.validation";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/create-student",
  auth(USER_ROLE.admin),
  validateRequest(StudentValidations.createStudentValidationSchema),
  StudentControllers.createStudent,
);

router.get("/filter", StudentControllers.filterStudents);
router.get("/years", StudentControllers.getDistinctYears);
router.get("/versions/:year", StudentControllers.getDistinctVersions);
router.get("/classes/:year/:version", StudentControllers.getDistinctClasses);
router.get(
  "/sections/:year/:version/:class",
  StudentControllers.getDistinctSections,
);
router.get(
  "/groups/:year/:version/:class",
  StudentControllers.getDistinctGroups,
);

router.get("/:studentId", StudentControllers.getStudent);
router.get("/", StudentControllers.getAllStudents);

router.patch(
  "/update-student/:studentId",
  auth(USER_ROLE.admin),
  validateRequest(StudentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete(
  "/:studentId",
  auth(USER_ROLE.admin),
  StudentControllers.deleteStudent,
);

export const StudentRoutes = router;
