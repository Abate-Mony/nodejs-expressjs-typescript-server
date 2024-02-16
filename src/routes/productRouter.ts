import { Router } from "express";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authMiddleware.js";
import { _user } from "../utils/constant.js";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getStaticProduct,
} from "../controllers/productController.js";

const router = Router();
router.post(
  "/new",
  authenticateUser,
  authorizePermissions(_user.ADMIN),
  createProduct
);
router.get("/", authenticateUser, getProducts);
router
  .route("/:id")
  .get(authenticateUser, getStaticProduct)
  .delete(authenticateUser, deleteProduct); // Get a single product by its id
// router.get(getStaticProduct);
export default router;
