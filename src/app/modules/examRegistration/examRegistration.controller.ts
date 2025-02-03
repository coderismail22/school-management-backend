// src/app/modules/examRegistration/examRegistration.controller.ts
import { Request, Response } from "express";

import httpStatus from "http-status";
import { ExamRegistrationServices } from "./examRegistration.service";
import { IExamRegistration } from "./examRegistration.interface";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const bulkRegisterStudents = catchAsync(async (req: Request, res: Response) => {
  const { examId, studentIds } = req.body;
  console.log("exam id", examId);
  console.log("student ids", studentIds);
  const result = await ExamRegistrationServices.bulkRegister(
    examId,
    studentIds,
  );
  sendResponse<IExamRegistration[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students registered successfullyyy",
    data: result,
  });
});

const getRegistrations = catchAsync(async (req: Request, res: Response) => {
  const filters = req.query;
  console.log("filters", filters);
  const result = await ExamRegistrationServices.getRegistrations(filters);
  sendResponse<IExamRegistration[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Exam registrations fetched successfully",
    data: result,
  });
});
const getRegistration = catchAsync(async (req: Request, res: Response) => {
  const filters = req.query;
  // console.log("filters", filters);
  const result = await ExamRegistrationServices.getRegistration(filters);
  if (result === null) {
    sendResponse<IExamRegistration>(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Exam registration not found",
      data: undefined,
    });
  } else {
    sendResponse<IExamRegistration>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Exam registration fetched successfully",
      data: result, // Wrap the result in an array
    });
  }
});

const deleteExamRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { registrationId } = req.params;
    const result =
      await ExamRegistrationServices.deleteRegistration(registrationId);
    sendResponse<IExamRegistration>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Exam registration deleted successfully",
      data: result,
    });
  },
);

export const ExamRegistrationControllers = {
  bulkRegisterStudents,
  getRegistrations,
  getRegistration,
  deleteExamRegistration,
};
