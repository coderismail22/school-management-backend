/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { Admin } from "../admin/admin.model";
import { TAdmin } from "../admin/admin.interface";
import { IStudent } from "../student/student.interface";
import { ITeacher } from "../teacher/teacher.interface";
import { Teacher } from "../teacher/teacher.model";

const createTeacherInDB = async (payload: ITeacher) => {
  // create a user object
  const userData: Partial<IUser> = {};
  userData.name = payload.name;
  userData.role = "teacher";
  userData.email = payload.email;
  userData.password = payload.password;
  // userData.hasAccess = true;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //TODO: Generate Dynamic ID
    //TODO: Upload image to Cloudinary using Multer

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    // create a student (transaction-2)
    const newStudent = await Teacher.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create teacher");
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const updateTeacherInDB = async (teacherId: string, payload: any) => {
  const { ...updates } = payload;

  if (!teacherId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Teacher ID is required");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Define which fields belong to the User model
    const userFields: Array<keyof IUser> = [
      "name",
      "email",
      "password",
      "status",
    ];
    // Define which fields belong to the Teacher model
    const teacherFields: Array<keyof ITeacher> = [
      "profileImg",
      "address",
      "phone",
      "bloodGroup",
      "salary",
    ];

    // Separate updates for User and Teacher
    const userUpdates: Partial<IUser> = {};
    const teacherUpdates: Partial<ITeacher> = {};

    Object.keys(updates).forEach((key) => {
      if (userFields.includes(key as keyof IUser)) {
        userUpdates[key as keyof IUser] = updates[key];
      } else if (teacherFields.includes(key as keyof ITeacher)) {
        teacherUpdates[key as keyof ITeacher] = updates[key];
      }
    });

    // Find the teacher document by ID
    const teacher = await Teacher.findById(teacherId).session(session);
    if (!teacher) {
      throw new AppError(httpStatus.NOT_FOUND, "Teacher not found");
    }

    // Find the related user document by email or user ID from the teacher document
    const user = await User.findOne({ email: teacher.email }).session(session);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "Associated user not found");
    }

    // Update the user details
    if (Object.keys(userUpdates).length > 0) {
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $set: userUpdates },
        { new: true, session },
      );
      if (!updatedUser) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update user");
      }
    }

    // Update the teacher details
    if (Object.keys(teacherUpdates).length > 0) {
      const updatedTeacher = await Teacher.findByIdAndUpdate(
        teacherId,
        { $set: teacherUpdates },
        { new: true, session },
      );
      if (!updatedTeacher) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update teacher");
      }
    }

    await session.commitTransaction();
    await session.endSession();

    return { message: "Teacher and User updated successfully" };
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const createStudentInDB = async (payload: IStudent) => {
  // create a user object
  const userData: Partial<IUser> = {};
  userData.name = payload.name;
  userData.role = "student";
  userData.email = payload.email;
  userData.password = payload.password;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //TODO: Generate Dynamic ID
    //TODO: Upload image to Cloudinary using Multer

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    // create a student (transaction-2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const createAdminInDB = async (payload: TAdmin) => {
  // create a user object
  const userData: Partial<IUser> = {};
  userData.name = payload.name;
  userData.role = "admin";
  userData.email = payload.email;
  userData.password = payload.password;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // TODO: Generate Dynamic ID
    // TODO: Upload image to Cloudinary using Multer

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    // create an admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      err.message || "Transaction failed",
    );
  }
};

const getMeFromDB = async (userId: string, role: string) => {
  // Check if token is provided
  if (!userId || !role) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not found.");
  }

  let result;

  // Fetch data based on the user's role
  switch (role) {
    case "admin":
      result = await Admin.findOne({ id: userId });
      break;
    case "student":
      result = await Student.findOne({ id: userId }).populate("");
      break;
    default:
      throw new AppError(
        httpStatus.FORBIDDEN,
        "Access denied. Role not recognized.",
      );
  }

  // Return the result or handle the case where no data is found
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, `${role} data not found.`);
  }

  return result;
};

const changeStatusInDB = async (id: string, status: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true },
  );
  return result;
};

export const UserServices = {
  createTeacherInDB,
  updateTeacherInDB,
  createStudentInDB,
  createAdminInDB,
  getMeFromDB,
  changeStatusInDB,
};
