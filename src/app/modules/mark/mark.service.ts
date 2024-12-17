import { MarkModel } from "./mark.model";
import { IMark } from "./mark.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const createMarkInDB = async (payload: IMark) => {
  return await MarkModel.create(payload);
};

const getMarkFromDB = async (markId: string) => {
  const mark = await MarkModel.findById(markId);
  if (!mark) throw new AppError(httpStatus.NOT_FOUND, "Mark not found");
  return mark;
};

const getAllMarksFromDB = async () => {
  return await MarkModel.find();
};

const updateMarkInDB = async (markId: string, payload: Partial<IMark>) => {
  const updatedMark = await MarkModel.findByIdAndUpdate(markId, payload, {
    new: true,
    runValidators: true,
  });
  if (!updatedMark) throw new AppError(httpStatus.NOT_FOUND, "Mark not found");
  return updatedMark;
};

const deleteMarkFromDB = async (markId: string) => {
  const deletedMark = await MarkModel.findByIdAndDelete(markId);
  if (!deletedMark) throw new AppError(httpStatus.NOT_FOUND, "Mark not found");
  return deletedMark;
};

export const MarkServices = {
  createMarkInDB,
  getMarkFromDB,
  getAllMarksFromDB,
  updateMarkInDB,
  deleteMarkFromDB,
};
