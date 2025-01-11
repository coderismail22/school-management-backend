import { Request, Response } from "express";
import { AdministrationServices } from "./administration.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createAdministration = catchAsync(async (req: Request, res: Response) => {
  const result = await AdministrationServices.createAdministrationInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Administration created successfully",
    data: result,
  });
});

const getAdministration = catchAsync(async (req: Request, res: Response) => {
  const result = await AdministrationServices.getAdministrationFromDB(req.params.administrationId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Administration record retrieved successfully",
    data: result,
  });
});

const getAllAdministrations = catchAsync(async (req: Request, res: Response) => {
  const result = await AdministrationServices.getAllAdministrationsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All administration records retrieved successfully",
    data: result,
  });
});

const updateAdministration = catchAsync(async (req: Request, res: Response) => {
  const result = await AdministrationServices.updateAdministrationInDB(req.params.administrationId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Administration record updated successfully",
    data: result,
  });
});

const deleteAdministration = catchAsync(async (req: Request, res: Response) => {
  const result = await AdministrationServices.deleteAdministrationFromDB(req.params.administrationId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Administration record deleted successfully",
    data: result,
  });
});

export const AdministrationControllers = {
  createAdministration,
  getAdministration,
  getAllAdministrations,
  updateAdministration,
  deleteAdministration,
};
