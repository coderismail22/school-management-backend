import { Router } from "express";
import { AttendanceControllers } from "./attendance.controller";
import { AttendanceValidations } from "./attendance.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/create-attendance",
  validateRequest(AttendanceValidations.createAttendanceSchema),
  AttendanceControllers.createAttendance
);

router.get("/:attendanceId", AttendanceControllers.getAttendance);
router.get("/", AttendanceControllers.getAllAttendances);

router.patch(
  "/update-attendance/:attendanceId",
  validateRequest(AttendanceValidations.updateAttendanceSchema),
  AttendanceControllers.updateAttendance
);

router.delete("/:attendanceId", AttendanceControllers.deleteAttendance);

export const AttendanceRoutes = router;
