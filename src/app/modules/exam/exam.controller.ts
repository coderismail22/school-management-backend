// src/app/modules/exam/exam.controller.ts
import { Request, Response } from "express";
import httpStatus from "http-status";
import { IExam } from "./exam.interface";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ExamServices } from "./exam.service";

const createExam = catchAsync(async (req: Request, res: Response) => {
  const examData = req.body;
  const result = await ExamServices.createExamInDB(examData);
  sendResponse<IExam>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Exam created successfully",
    data: result,
  });
});

const getExamById = catchAsync(async (req: Request, res: Response) => {
  const { examId } = req.params;
  const result = await ExamServices.getExamFromDB(examId);
  sendResponse<IExam>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Exam retrieved successfullyyyyyyyyyy",
    data: result,
  });
});

const updateExam = catchAsync(async (req: Request, res: Response) => {
  const { examId } = req.params;
  const updatedData = req.body;
  const result = await ExamServices.updateExamInDB(examId, updatedData);
  sendResponse<IExam>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Exam updated successfully",
    data: result,
  });
});

const deleteExam = catchAsync(async (req: Request, res: Response) => {
  const { examId } = req.params;
  const result = await ExamServices.deleteExamFromDB(examId);
  sendResponse<IExam>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Exam deleted successfully",
    data: result,
  });
});

const getAllExams = catchAsync(async (req: Request, res: Response) => {
  const filters = req.query;
  const result = await ExamServices.getAllExamsFromDB(filters);
  sendResponse<IExam[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Exams retrieved successfully",
    data: result,
  });
});

export const ExamController = {
  createExam,
  getExamById,
  updateExam,
  deleteExam,
  getAllExams,
};
