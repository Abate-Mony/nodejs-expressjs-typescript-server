import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { BadRequestError, UnauthenticatedError, } from "../errors/customErrors.js";
import { createJWT, sanitizeUser } from "../utils/tokenUtils.js";
export const register = async (req, res) => {
    const isFirstAccount = (await User.countDocuments()) === 0;
    console.log(`count(${isFirstAccount} ${"admin" /* _user.ADMIN */})`);
    req.body.role = isFirstAccount ? "admin" /* _user.ADMIN */ : "user" /* _user.USER */;
    const { password, name, email, } = req.body;
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
export const login = async (req, res) => {
    //   console.log("this req.bpdy", req.body);
    const { email, password, } = req.body;
    const user = await User.findOne({ email: email });
    const isValidUser = user && (await comparePassword(password, user.password));
    if (!isValidUser)
        throw new UnauthenticatedError("invalid credentials");
    // if (!user.isVerified) {
    //   throw new BadRequestError("your account is not verified !");
    // }
    const token = createJWT({ userId: user._id, role: user.role });
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production",
    });
    res.status(StatusCodes.OK).json({ msg: "user logged in" });
};
export const logout = (req, res) => {
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
//# sourceMappingURL=AuthController.js.map