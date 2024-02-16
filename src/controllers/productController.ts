import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/customErrors.js";
import UserModel from "../models/UserModel.js";
import Product from "../models/productModel.js";
import { Request, Respond } from "express";
import { _user } from "../utils/constant.js";
import { generateUniqueRandomString } from "../utils/generateRandomNumber.js";
export const createProduct = async (req: Request, res: Respond) => {
  const { userId } = req.user;
  const user = await UserModel.findOne({ _id: userId });

  if (!user)
    throw new BadRequestError(`could not found user with id ${userId}`);
  req.body.createdBy = {
    userId,
    user: user.name,
  };
  // const uniqueStr = await generateUniqueRandomString();
  // req.body.id = uniqueStr;
  const product = await Product.create(req.body);
  res.status(200).json(product);
};
export const getStaticProduct = async (req: Request, res: Respond) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product)
    throw new BadRequestError(`No product with id:${req.params.id}`);
  res.status(StatusCodes.OK).json({ product });
};
export const getProducts = async (req: Request, res: Respond) => {
  //   const { userId } = req.user;
  const queryObject = {
    // "createdBy.userId": req.user?.userId,
  };
  const products = await Product.find({
    ...queryObject,
  });
  res.status(StatusCodes.OK).json({ products });
};
export const deleteProduct = async (req: Request, res: Respond) => {
  const { role, userId } = req.user;
  const queryObject = {
    _id: req.params.id,
  };
  if (role !== _user.ADMIN) {
    queryObject[`createdBy.userId`] = userId;
  }
  const product = await Product.findOneAndDelete(queryObject);
  if (!product) throw new BadRequestError("fail to delete ");
  res.status(StatusCodes.OK).json({ msg: "delete success" });
};
