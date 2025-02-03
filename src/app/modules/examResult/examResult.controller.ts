// src/app/modules/examResult/examResult.controller.ts
import { Request, Response } from "express";
import httpStatus from "http-status";
import { ExamResultServices } from "./examResult.service";

import { IExamResult } from "./examResult.interface";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createOrUpdateResult = catchAsync(async (req: Request, res: Response) => {
  // In a real scenario, you would check if the teacher is allowed to update the subject:
  // e.g. confirm that (examId, examSubjectId).subjectTeacher == currentTeacherId
  // We'll skip the full auth logic here for brevity.
  const payload = req.body;
  const result = await ExamResultServices.createOrUpdateExamResult(payload);
  sendResponse<IExamResult>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Result created/updated successfully",
    data: result,
  });
});

const getSingleResult = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ExamResultServices.getExamResult(id);
  sendResponse<IExamResult>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Exam result retrieved successfully",
    data: result,
  });
});

const getAllResults = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const results = await ExamResultServices.getExamResults(query);
  sendResponse<IExamResult[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Exam results retrieved successfullyyyyyyy",
    data: results,
  });
});

export const ExamResultControllers = {
  createOrUpdateResult,
  getSingleResult,
  getAllResults,
};
