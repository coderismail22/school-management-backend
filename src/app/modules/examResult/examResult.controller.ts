// src/app/modules/examResult/examResult.controller.ts
import { Request, Response } from "express";
import httpStatus from "http-status";
import { ExamResultServices } from "./examResult.service";

import { IExamResult } from "./examResult.interface";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createOrUpdateResult = catchAsync(async (req: Request, res: Response) => {
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
    message: "Exam results retrieved successfully",
    data: results,
  });
});

export const ExamResultControllers = {
  createOrUpdateResult,
  getSingleResult,
  getAllResults,
};
