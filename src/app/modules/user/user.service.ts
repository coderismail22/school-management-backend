/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { Admin } from "../admin/admin.model";
import { TAdmin } from "../admin/admin.interface";
// import { IStudent } from "../student/student.interface";
import { ITeacher } from "../teacher/teacher.interface";
import { Teacher } from "../teacher/teacher.model";
import { IStudent } from "../student/student.interface";

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

    // create a teacher (transaction-2)
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
      "email",
      "password",
      "profileImg",
      "address",
      "phone",
      "bloodGroup",
      "teacherId",
      "dob",
      "gender",
      "designation",
      "subject",
    ];

    // Separate updates for User and Teacher
    const userUpdates: Partial<IUser> = {};
    const teacherUpdates: Partial<ITeacher> = {};

    Object.keys(updates).forEach((key) => {
      if (userFields.includes(key as keyof IUser)) {
        userUpdates[key as keyof IUser] = updates[key];
      }
      if (teacherFields.includes(key as keyof ITeacher)) {
        teacherUpdates[key as keyof ITeacher] = updates[key];
      }
    });

    if (
      Object.keys(userUpdates).length === 0 &&
      Object.keys(teacherUpdates).length === 0
    ) {
      throw new AppError(httpStatus.BAD_REQUEST, "No valid fields to update");
    }

    // Find the teacher document by ID
    const teacher = await Teacher.findById(teacherId).session(session);
    if (!teacher) {
      throw new AppError(httpStatus.NOT_FOUND, "Teacher not found");
    }

    // Preserve the original email before updates
    const originalEmail = teacher.email;

    // Find the related user document by email or user ID from the teacher document
    const user = await User.findOne({ email: originalEmail }).session(session);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "Associated user not found");
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

    await session.commitTransaction();
    await session.endSession();

    return { user, teacher };
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const deleteTeacherFromDB = async (teacherId: string) => {
  if (!teacherId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Teacher ID is required");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Find the teacher by ID
    const teacher = await Teacher.findById(teacherId).session(session);
    if (!teacher) {
      throw new AppError(httpStatus.NOT_FOUND, "Teacher not found");
    }

    // Find the associated user using the email
    const user = await User.findOne({ email: teacher.email }).session(session);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "Associated user not found");
    }

    // Delete the teacher document
    await Teacher.findByIdAndDelete(teacherId, { session });

    // Delete the associated user document
    await User.findByIdAndDelete(user._id, { session });

    await session.commitTransaction();
    await session.endSession();
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const createStudentInDB = async (payload: IStudent) => {
  // Create a user object
  const userData: Partial<IUser> = {};
  userData.name = payload.name;
  userData.role = "student";
  userData.email = payload.email;
  userData.password = payload.password;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // TODO: Generate Dynamic ID
    // TODO: Upload image to Cloudinary using Multer

    // Create a user (transaction-1)
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    // Create a student (transaction-2)
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

const updateStudentInDB = async (studentId: string, payload: any) => {
  const { ...updates } = payload;

  if (!studentId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Student ID is required");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Define which fields belong to the User model
    const userFields: Array<keyof IUser> = ["name", "email", "password"];

    // Define which fields belong to the Student model
    const studentFields: Array<keyof IStudent> = [
      "name",
      "studentId",
      "profileImg",
      "year",
      "birthRegId",
      "bloodGroup",
      "gender",
      "phone",
      "email",
      "address",
      "class",
      "section",
      "group",
      "version",
      "shift",
      "roll",
      "fatherName",
      "fatherPhone",
      "motherName",
      "motherPhone",
      "password",
    ];

    // Separate updates for User and Student
    const userUpdates: Partial<IUser> = {};
    const studentUpdates: Partial<IStudent> = {};

    Object.keys(updates).forEach((key) => {
      if (userFields.includes(key as keyof IUser)) {
        userUpdates[key as keyof IUser] = updates[key];
      }
      if (studentFields.includes(key as keyof IStudent)) {
        studentUpdates[key as keyof IStudent] = updates[key];
      }
    });

    if (
      Object.keys(userUpdates).length === 0 &&
      Object.keys(studentUpdates).length === 0
    ) {
      throw new AppError(httpStatus.BAD_REQUEST, "No valid fields to update");
    }

    // Find the student document by ID
    const student = await Student.findById(studentId).session(session);
    if (!student) {
      throw new AppError(httpStatus.NOT_FOUND, "Student not found");
    }

    // Preserve the original email before updates
    const originalEmail = student.email;

    // Find the related user document by email or user ID from the student document
    const user = await User.findOne({ email: originalEmail }).session(session);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "Associated user not found");
    }

    // Update the student details
    if (Object.keys(studentUpdates).length > 0) {
      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        { $set: studentUpdates },
        { new: true, session },
      );
      if (!updatedStudent) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update student");
      }
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

    await session.commitTransaction();
    await session.endSession();

    return { user, student };
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const deleteStudentFromDB = async (studentId: string) => {
  if (!studentId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Student ID is required");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Find the student by ID
    const student = await Student.findById(studentId).session(session);
    if (!student) {
      throw new AppError(httpStatus.NOT_FOUND, "Student not found");
    }

    // Find the associated user using the email
    const user = await User.findOne({ email: student.email }).session(session);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "Associated user not found");
    }

    // Delete the student document
    await Student.findByIdAndDelete(studentId, { session });

    // Delete the associated user document
    await User.findByIdAndDelete(user._id, { session });

    await session.commitTransaction();
    await session.endSession();
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
  deleteTeacherFromDB,
  createStudentInDB,
  deleteStudentFromDB,
  updateStudentInDB,
  createAdminInDB,
  getMeFromDB,
  changeStatusInDB,
};
