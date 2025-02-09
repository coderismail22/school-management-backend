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
    message: "Exam retrieved successfully",
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
  // console.log("controller filterQuery", filters);
  const result = await ExamServices.getAllExamsFromDB(filters);
  sendResponse<IExam[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Exams retrieved successfully",
    data: result,
  });
});

// Teacher only exams
const getExamsForTeacher = catchAsync(async (req: Request, res: Response) => {
  const {
    year,
    version,
    class: className,
    shift,
    section,
    group,
    teacherId,
  } = req.query;

  const result = await ExamServices.getTeacherExams({
    year,
    version,
    className,
    shift,
    section,
    group,
    teacherId,
  });

  if (result.length === 0) {
    return sendResponse<IExam[]>(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No exams found for the given criteria",
      data: [],
    });
  }
// console.log('teacher exam result',result)
  sendResponse<IExam[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Exams retrieved successfully",
    data: result,
  });
});

export const ExamControllers = {
  createExam,
  getExamById,
  updateExam,
  deleteExam,
  getAllExams,
  getExamsForTeacher,
};
