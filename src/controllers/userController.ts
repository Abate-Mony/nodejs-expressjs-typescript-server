import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
// import { sanitizeFilter } from "mongoose";
import {Request,Response} from "express"
import { sanitizeUser } from "../utils/tokenUtils.js";
export const getCurrentUser = async (req:Request, res:Response) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = sanitizeUser(user);
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};
