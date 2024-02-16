import express from "express";
import { authorizePermissions } from "../middleware/authMiddleware.js";
import { _user } from "../utils/constant.js";
import { getCurrentUser } from "../controllers/userController.js";
const router = express.Router();
router.get("/current-user", authorizePermissions(_user.USER), getCurrentUser);

export default router;
