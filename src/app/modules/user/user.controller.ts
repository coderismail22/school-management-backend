import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createTeacher = catchAsync(async (req, res) => {
  const result = await UserServices.createTeacherInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teacher is created successfully",
    data: result,
  });
});

const updateTeacher = catchAsync(async (req, res) => {
  const teacherId = req.params.teacherId;
  const result = await UserServices.updateTeacherInDB(teacherId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teacher is updated successfully",
    data: result,
  });
});

const deleteTeacher = catchAsync(async (req, res) => {
  const teacherId = req.params.teacherId;
  await UserServices.deleteTeacherFromDB(teacherId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teacher deleted successfully",
  });
});

const createStudent = catchAsync(async (req, res) => {
  const result = await UserServices.createStudentInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is created successfully",
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  // console.log("controller", studentId);
  // console.log("controller", req.body);
  const result = await UserServices.updateStudentInDB(studentId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is updated successfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  await UserServices.deleteStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student deleted successfully",
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const result = await UserServices.createAdminInDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is created successfully",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const user = req?.user;

  const result = await UserServices.getMeFromDB(user.userId, user.role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

// const changeStatus = catchAsync(async (req, res) => {
//   const id = req.params.id;
//   const { status } = req.body;
//   const result = await UserServices.changeStatusIntoDB(id, status);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Status changed successfully",
//     data: result,
//   });
// });

export const UserControllers = {
  createTeacher,
  updateTeacher,
  deleteTeacher,
  createStudent,
  updateStudent,
  deleteStudent,
  createAdmin,
  getMe,
  // changeStatus,
};
