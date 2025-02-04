import httpStatus from "http-status";
import AppError from "../../errors/AppError";

export const validateMark = (
  mark: number,
  maxMark: number | undefined,
  markType: string,
) => {
  if (mark === undefined || mark === null) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${markType} mark is required and cannot be empty.`,
    );
  }

  if (typeof mark !== "number" || isNaN(mark)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${markType} mark must be a valid number.`,
    );
  }

  if (mark < 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${markType} mark cannot be negative.`,
    );
  }

  if (maxMark !== undefined && mark > maxMark) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${markType} mark cannot be greater than ${maxMark}.`,
    );
  }
};
