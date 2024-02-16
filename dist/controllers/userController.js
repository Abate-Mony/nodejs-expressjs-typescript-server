import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import { sanitizeUser } from "../utils/tokenUtils.js";
export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    const userWithoutPassword = sanitizeUser(user);
    res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};
//# sourceMappingURL=userController.js.map