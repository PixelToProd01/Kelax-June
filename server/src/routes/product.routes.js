import { Router } from "express";
import {
  authorizeRoles,
  isAdminAuthenticated,
} from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  deleteProduct,
  getProductBySlug,
} from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post(
  "/create-product",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "datasheet", maxCount: 1 },
  ]),
  isAdminAuthenticated,
  authorizeRoles("admin"),
  createProduct,
);


// Get Product By Category For All Users, Without Authenticated are included  --> getAllProducts
productRouter.get("/get-all-product", getAllProducts);

// Get Product By Product Id For All Users, Without Authenticated are included  ----->  getProductBySlug
productRouter.get("/get-product/:slug", getProductBySlug);

//   Get All Product By Category
productRouter.get("/get-products/:category", getProductsByCategory);

// Delete Product ------>  deleteProduct
productRouter.delete(
  "/delete-product/:id",
  isAdminAuthenticated,
  authorizeRoles("admin"),
  deleteProduct,
);

export default productRouter;
