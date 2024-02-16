import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/customErrors.js";
import { createJWT, sanitizeUser } from "../utils/tokenUtils.js";
import { Request, Response } from "express";
import { _user } from "../utils/constant.js";
import { RequestHandler } from "express";
export const register = async (req: Request, res: Response): Promise<void> => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  console.log(`count(${isFirstAccount} ${_user.ADMIN})`);
  req.body.role = isFirstAccount ? _user.ADMIN : _user.USER;
  const {
    password,
    name,
    email,
  }: { password: string; email: string; name: string } = req.body;
  //   prevent user from creating multi account with the same email
  const isUserAlreadyExist = await User.findOne({ email });
  if (isUserAlreadyExist)
    throw new BadRequestError(`user already exist with email ${email}`);
  const hashedPassword = await hashPassword(password);
  req.body.password = hashedPassword;
  const user = await User.create({
    ...req.body
  });
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "user created", user: sanitizeUser(user) });
};
export const login: RequestHandler = async (req, res) => {
  //   console.log("this req.bpdy", req.body);
  const {
    email,
    password,
  }: {
    email: string;
    password: string;
  } = req.body;
  const user = await User.findOne({ email: email });
  const isValidUser = user && (await comparePassword(password, user.password));
  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");
  // if (!user.isVerified) {
  //   throw new BadRequestError("your account is not verified !");
  // }
  const token = createJWT({ userId: user._id, role: user.role });
  const oneDay: number = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "user logged in" });
};

export const logout: RequestHandler = (req, res): void => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
