import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/customErrors.js";
import UserModel from "../models/UserModel.js";
import Product from "../models/productModel.js";
export const createProduct = async (req, res) => {
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
export const getStaticProduct = async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product)
        throw new BadRequestError(`No product with id:${req.params.id}`);
    res.status(StatusCodes.OK).json({ product });
};
export const getProducts = async (req, res) => {
    //   const { userId } = req.user;
    const queryObject = {
    // "createdBy.userId": req.user?.userId,
    };
    const products = await Product.find({
        ...queryObject,
    });
    res.status(StatusCodes.OK).json({ products });
};
export const deleteProduct = async (req, res) => {
    const { role, userId } = req.user;
    const queryObject = {
        _id: req.params.id,
    };
    if (role !== "admin" /* _user.ADMIN */) {
        queryObject[`createdBy.userId`] = userId;
    }
    const product = await Product.findOneAndDelete(queryObject);
    if (!product)
        throw new BadRequestError("fail to delete ");
    res.status(StatusCodes.OK).json({ msg: "delete success" });
};
//# sourceMappingURL=productController.js.map