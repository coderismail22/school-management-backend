import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import bcrypt from "bcrypt";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { createToken } from "./auth.utils";
import sendEmail from "../../utils/sendEmail";
import { Admin } from "../admin/admin.model";
import { Student } from "../student/student.model";
import { Teacher } from "../teacher/teacher.model";

// login
const loginUser = async (payload: TLoginUser) => {
  // 1. Check if the user exist
  const user = await User.findOne({ email: payload?.email }).select(
    "+password",
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist.");
  }

  //2. Check if the user is blocked
  if (user?.status === "blocked") {
    throw new AppError(httpStatus.NOT_FOUND, "The user has been blocked.");
  }

  // 3. Check if the password is correct
  const isPasswordValid = payload?.password === user.password;

  if (!isPasswordValid) {
    throw new AppError(httpStatus.NOT_FOUND, "Password is incorrect.");
  }

  // 4. Prepare JWT Payload
  const jwtPayload: {
    userId: string;
    email: string;
    role: string;
    adminId?: string;
    teacherId?: string;
    studentId?: string;
  } = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  // Assign role-based IDs
  if (user.role === "superAdmin" || user.role === "admin") {
    const admin = await Admin.findOne({ email: user.email });
    if (admin) jwtPayload.adminId = admin._id.toString();
  } else if (user.role === "teacher") {
    const teacher = await Teacher.findOne({ email: user.email });
    if (teacher) jwtPayload.teacherId = teacher._id.toString();
  } else if (user.role === "student") {
    const student = await Student.findOne({ email: user.email });
    if (student) jwtPayload.studentId = student._id.toString();
  }

  // generate access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_token_expires_in as string,
  );

  // generate refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_token_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

// access token renewal
const refreshToken = async (token: string) => {
  // if token not provided
  if (!token) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to access!",
    );
  }

  // Verify the token
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  // used "iat"
  const { role, userId } = decoded;

  // check: does the user exist
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist.");
  }

  // check: is the user deleted
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "The user has been deleted.");
  }

  // check: userStatus
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "The user has been blocked.");
  }

  const jwtPayload = {
    userId: userId,
    role: role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_token_expires_in as string,
  );
  return accessToken;
};

//change password
const changePassword = async (
  userData: JwtPayload,
  payload: { newPassword: string; oldPassword: string },
) => {
  // check: does the user exist
  const user = await User.doesUserExistByCustomId(userData?.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist.");
  }

  // check: is the user deleted
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "The user has been deleted.");
  }

  // check: userStatus
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "The user has been blocked.");
  }

  // check: doesPasswordMatch
  const doesPasswordMatch = await User.doPasswordsMatch(
    payload?.oldPassword,
    user?.password,
  );

  if (!doesPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, "Passwords is incorrect.");
  }

  // Password hashing before saving
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  // Finally Update Password Into DB
  const result = await User.findOneAndUpdate(
    {
      id: userData?.userId,
      role: userData?.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return result;
};

// forgot password
const forgotPassword = async (userId: string) => {
  // check: does the user exist
  const user = await User.doesUserExistByCustomId(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist.");
  }

  // check: is the user deleted
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "The user has been deleted.");
  }

  // check: userStatus
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "The user has been blocked.");
  }

  // Token generation
  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "10m",
  );
  const resetPasswordUILink = `${config.reset_password_ui_link}?id=${user._id}&token=${resetToken}`;
  sendEmail(resetPasswordUILink);
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  // check: does the user exist
  const user = await User.doesUserExistByCustomId(payload.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist.");
  }

  // check: is the user deleted
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "The user has been deleted.");
  }

  // check: userStatus
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "The user has been blocked.");
  }

  // Verify the token
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  // do user matches
  if (payload.id !== decoded.userId) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User doesn't have access to the specified service.",
    );
  }

  // Password hashing before saving
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  // Finally Update Password Into DB
  const result = await User.findOneAndUpdate(
    {
      id: decoded?.userId,
      role: decoded?.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return result;
};
export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgotPassword,
  resetPassword,
};
