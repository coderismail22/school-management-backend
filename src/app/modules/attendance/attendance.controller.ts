// src/modules/attendance/attendance.controller.ts
import { Request, Response } from "express";
import httpStatus from "http-status";
import { AttendanceServices } from "./attendance.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const loadAttendance = catchAsync(async (req: Request, res: Response) => {
  // Extract 'group' as well
  const { year, version, class: className, section, shift, date, group } = req.query;

  const result = await AttendanceServices.loadAttendanceFromDB({
    year: year as string,
    version: version as string,
    class: className as string,
    section: section as string,
    shift: shift as string,
    date: date as string,
    group: group as string, // new field
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attendance loaded successfully",
    data: result,
  });
});

const updateAttendance = catchAsync(async (req: Request, res: Response) => {
  console.log("hit");

  // The body is an array of attendance objects, each presumably with group
  const attendances = req.body;
  const result = await AttendanceServices.updateAttendanceInDB(attendances);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attendance updated successfully",
    data: result,
  });
});

export const AttendanceControllers = {
  loadAttendance,
  updateAttendance,
};
