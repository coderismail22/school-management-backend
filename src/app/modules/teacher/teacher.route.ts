import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { TeacherValidations } from "./teacher.validation";
import { TeacherControllers } from "./teacher.controller";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-teacher",
  auth(USER_ROLE.admin),
  validateRequest(TeacherValidations.createTeacherValidationSchema),
  TeacherControllers.createTeacher,
);

router.get("/:teacherId", TeacherControllers.getTeacher);

router.get("/", TeacherControllers.getAllTeachers);

router.patch(
  "/update-teacher/:teacherId",
  auth(USER_ROLE.admin),
  validateRequest(TeacherValidations.updateTeacherValidationSchema),
  TeacherControllers.updateTeacher,
);

router.delete(
  "/:teacherId",
  auth(USER_ROLE.admin),
  TeacherControllers.deleteTeacher,
);

export const TeacherRoutes = router;
