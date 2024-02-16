import express from "express";
import { authorizePermissions } from "../middleware/authMiddleware.js";
import { getCurrentUser } from "../controllers/userController.js";
const router = express.Router();
router.get("/current-user", authorizePermissions("user" /* _user.USER */), getCurrentUser);
export default router;
//# sourceMappingURL=userRouter.js.map