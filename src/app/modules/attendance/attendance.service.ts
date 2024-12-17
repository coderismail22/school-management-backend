import { AttendanceModel } from "./attendance.model";
import { IAttendance } from "./attendance.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const createAttendanceInDB = async (payload: IAttendance) => {
  return await AttendanceModel.create(payload);
};

const getAttendanceFromDB = async (attendanceId: string) => {
  const attendance = await AttendanceModel.findById(attendanceId);
  if (!attendance)
    throw new AppError(httpStatus.NOT_FOUND, "Attendance not found");
  return attendance;
};

const getAllAttendancesFromDB = async () => {
  return await AttendanceModel.find();
};

const updateAttendanceInDB = async (
  attendanceId: string,
  payload: Partial<IAttendance>
) => {
  const updatedAttendance = await AttendanceModel.findByIdAndUpdate(
    attendanceId,
    payload,
    { new: true, runValidators: true }
  );
  if (!updatedAttendance)
    throw new AppError(httpStatus.NOT_FOUND, "Attendance not found");
  return updatedAttendance;
};

const deleteAttendanceFromDB = async (attendanceId: string) => {
  const deletedAttendance = await AttendanceModel.findByIdAndDelete(
    attendanceId
  );
  if (!deletedAttendance)
    throw new AppError(httpStatus.NOT_FOUND, "Attendance not found");
  return deletedAttendance;
};

export const AttendanceServices = {
  createAttendanceInDB,
  getAttendanceFromDB,
  getAllAttendancesFromDB,
  updateAttendanceInDB,
  deleteAttendanceFromDB,
};
