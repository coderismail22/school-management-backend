import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { StudentValidations } from "./../student/student.validation";
import { UserControllers } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import { TeacherValidations } from "../teacher/teacher.validation";
import { AdminValidations } from "../admin/admin.validation";

const router = express.Router();

// create admin
router.post(
  "/create-admin",
  auth(USER_ROLE.admin),
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);

// create teacher
router.post(
  "/create-teacher",
  auth(USER_ROLE.admin),
  validateRequest(TeacherValidations.createTeacherValidationSchema),
  UserControllers.createTeacher,
);

// update teacher
router.patch(
  "/update-teacher/:teacherId",
  auth(USER_ROLE.admin),
  validateRequest(TeacherValidations.updateTeacherValidationSchema),
  UserControllers.updateTeacher,
);

// delete teacher
router.delete(
  "/delete-teacher/:teacherId",
  auth(USER_ROLE.admin),
  UserControllers.deleteTeacher,
);

// create student
router.post(
  "/register-student",
  auth(USER_ROLE.admin),
  validateRequest(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

// update student
router.patch(
  "/update-student/:studentId",
  auth(USER_ROLE.admin),
  validateRequest(StudentValidations.updateStudentValidationSchema),
  UserControllers.updateStudent,
);

// delete student
router.delete(
  "/delete-student/:studentId",
  auth(USER_ROLE.admin),
  UserControllers.deleteStudent,
);

// TODO: Add change status route (if needed)
// router.post(
//   "/change-status/:id",
//   auth("admin"),
//   validateRequest(UserValidations.changeUserStatusValidationSchema),
//   UserControllers.changeStatus,
// );

// TODO: Add me route (if needed)
// router.get(
//   "/me",
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.student),
//   UserControllers.getMe,
// );

export const UserRoutes = router;
