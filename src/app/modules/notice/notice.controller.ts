import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { NoticeServices } from "./notice.service";
import httpStatus from "http-status";

const createNotice = catchAsync(async (req: Request, res: Response) => {
  const result = await NoticeServices.createNoticeInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Notice created successfully",
    data: result,
  });
});

const getNotice = catchAsync(async (req: Request, res: Response) => {
  const result = await NoticeServices.getNoticeFromDB(req.params.noticeId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getAllNotices = catchAsync(async (req: Request, res: Response) => {
  const result = await NoticeServices.getAllNoticesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const updateNotice = catchAsync(async (req: Request, res: Response) => {
  const result = await NoticeServices.updateNoticeInDB(
    req.params.noticeId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notice updated successfully",
    data: result,
  });
});

const deleteNotice = catchAsync(async (req: Request, res: Response) => {
  await NoticeServices.deleteNoticeFromDB(req.params.noticeId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notice deleted successfully",
  });
});

export const NoticeControllers = {
  createNotice,
  getNotice,
  getAllNotices,
  updateNotice,
  deleteNotice,
};
