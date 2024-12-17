import { AssignmentModel } from "./assignment.model";
import { IAssignment } from "./assignment.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const createAssignmentInDB = async (payload: IAssignment) => {
  return await AssignmentModel.create(payload);
};

const getAssignmentFromDB = async (assignmentId: string) => {
  const assignment = await AssignmentModel.findById(assignmentId);
  if (!assignment)
    throw new AppError(httpStatus.NOT_FOUND, "Assignment not found");
  return assignment;
};

const getAllAssignmentsFromDB = async () => {
  return await AssignmentModel.find();
};

const updateAssignmentInDB = async (
  assignmentId: string,
  payload: Partial<IAssignment>,
) => {
  const updatedAssignment = await AssignmentModel.findByIdAndUpdate(
    assignmentId,
    payload,
    { new: true, runValidators: true },
  );
  if (!updatedAssignment)
    throw new AppError(httpStatus.NOT_FOUND, "Assignment not found");
  return updatedAssignment;
};

const deleteAssignmentFromDB = async (assignmentId: string) => {
  const deletedAssignment =
    await AssignmentModel.findByIdAndDelete(assignmentId);
  if (!deletedAssignment)
    throw new AppError(httpStatus.NOT_FOUND, "Assignment not found");
  return deletedAssignment;
};

export const AssignmentServices = {
  createAssignmentInDB,
  getAssignmentFromDB,
  getAllAssignmentsFromDB,
  updateAssignmentInDB,
  deleteAssignmentFromDB,
};
