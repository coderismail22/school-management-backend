import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AssignmentServices } from "./assignment.service";

const createAssignment = catchAsync(async (req: Request, res: Response) => {
  const assignment = await AssignmentServices.createAssignmentInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Assignment created successfully",
    data: assignment,
  });
});

const getAssignment = catchAsync(async (req: Request, res: Response) => {
  const assignment = await AssignmentServices.getAssignmentFromDB(
    req.params.assignmentId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Assignment fetched successfully",
    data: assignment,
  });
});

const getAllAssignments = catchAsync(async (req: Request, res: Response) => {
  const assignments = await AssignmentServices.getAllAssignmentsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All assignments fetched successfully",
    data: assignments,
  });
});

const updateAssignment = catchAsync(async (req: Request, res: Response) => {
  const assignment = await AssignmentServices.updateAssignmentInDB(
    req.params.assignmentId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Assignment updated successfully",
    data: assignment,
  });
});

const deleteAssignment = catchAsync(async (req: Request, res: Response) => {
  const assignment = await AssignmentServices.deleteAssignmentFromDB(
    req.params.assignmentId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Assignment deleted successfully",
    data: assignment,
  });
});

export const AssignmentControllers = {
  createAssignment,
  getAssignment,
  getAllAssignments,
  updateAssignment,
  deleteAssignment,
};
