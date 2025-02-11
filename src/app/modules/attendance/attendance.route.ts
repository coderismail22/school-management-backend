// src/modules/attendance/attendance.route.ts
import { Router } from "express";
// import validateRequest from "../../middlewares/validateRequest";
import { AttendanceControllers } from "./attendance.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
// import { AttendanceValidations } from "./attendance.validation";

const router = Router();

// GET /api/v1/attendance?year=...&version=...&class=...&section=...&shift=...&date=...
router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.teacher),
  // validateRequest(AttendanceValidations.loadAttendanceValidationSchema),
  AttendanceControllers.loadAttendance,
);

// PATCH /api/v1/attendance
router.patch(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.teacher),
  // validateRequest(AttendanceValidations.updateAttendanceValidationSchema),
  AttendanceControllers.updateAttendance,
);

export const AttendanceRoutes = router;
