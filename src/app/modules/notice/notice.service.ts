import { Notice } from "./notice.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { INotice } from "./notice.interface";

const createNoticeInDB = async (data: INotice) => {
  return await Notice.create(data);
};

const getNoticeFromDB = async (noticeId: string) => {
  const notice = await Notice.findById(noticeId);
  if (!notice) throw new AppError(httpStatus.NOT_FOUND, "Notice not found");
  return notice;
};

const getAllNoticesFromDB = async () => {
  return await Notice.find().sort({ createdAt: -1 });
};

const updateNoticeInDB = async (noticeId: string, data: Partial<INotice>) => {
  const notice = await Notice.findByIdAndUpdate(noticeId, data, {
    new: true,
    runValidators: true,
  });
  if (!notice) throw new AppError(httpStatus.NOT_FOUND, "Notice not found");
  return notice;
};

const deleteNoticeFromDB = async (noticeId: string) => {
  const notice = await Notice.findByIdAndDelete(noticeId);
  if (!notice) throw new AppError(httpStatus.NOT_FOUND, "Notice not found");
};

export const NoticeServices = {
  createNoticeInDB,
  getNoticeFromDB,
  getAllNoticesFromDB,
  updateNoticeInDB,
  deleteNoticeFromDB,
};
