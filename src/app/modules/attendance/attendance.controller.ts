import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AttendanceServices } from "./attendance.service";

const createAttendance = catchAsync(async (req: Request, res: Response) => {
  const attendance = await AttendanceServices.createAttendanceInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Attendance recorded successfully",
    data: attendance,
  });
});

const getAttendance = catchAsync(async (req: Request, res: Response) => {
  const attendance = await AttendanceServices.getAttendanceFromDB(
    req.params.attendanceId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attendance fetched successfully",
    data: attendance,
  });
});

const getAllAttendances = catchAsync(async (req: Request, res: Response) => {
  const attendances = await AttendanceServices.getAllAttendancesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All attendances fetched successfully",
    data: attendances,
  });
});

const updateAttendance = catchAsync(async (req: Request, res: Response) => {
  const attendance = await AttendanceServices.updateAttendanceInDB(
    req.params.attendanceId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attendance updated successfully",
    data: attendance,
  });
});

const deleteAttendance = catchAsync(async (req: Request, res: Response) => {
  const attendance = await AttendanceServices.deleteAttendanceFromDB(
    req.params.attendanceId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attendance deleted successfully",
    data: attendance,
  });
});

export const AttendanceControllers = {
  createAttendance,
  getAttendance,
  getAllAttendances,
  updateAttendance,
  deleteAttendance,
};
