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
  updateProduct,
  getProductById,
} from "../controllers/product.controller.js";

const productRouter = Router();

/* =========================================================
   CREATE PRODUCT
   POST /api/product/create-product
========================================================= */

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
/* =========================================================
   GET ALL PRODUCTS
   GET /api/product/get-all-product
========================================================= */
productRouter.get("/get-all-product", getAllProducts);

// Get Product By Product Id For All Users, Without Authenticated are included  ----->  getProductBySlug
/* =========================================================
   GET PRODUCT BY SLUG
   GET /api/product/get-product-by-slug/ye70-server-123
========================================================= */
// productRouter.get("/get-product/:slug", getProductBySlug);
productRouter.get("/get-product-by-slug/:slug", getProductBySlug);

//   Get All Product By Category
/* =========================================================
   GET PRODUCTS BY CATEGORY
   GET /api/product/get-products/server
   GET /api/product/get-products/workstation
========================================================= */
productRouter.get("/get-products/:category", getProductsByCategory);

// Delete Product ------>  deleteProduct
/* =========================================================
   DELETE PRODUCT
   DELETE /api/product/delete-product/PRODUCT_ID
========================================================= */
productRouter.delete(
  "/delete-product/:id",
  isAdminAuthenticated,
  authorizeRoles("admin"),
  deleteProduct,
);

// Specific Product Fetch Route
/* =========================================================
   GET PRODUCT BY ID
   GET /api/product/get-product/PRODUCT_ID
========================================================= */
productRouter.get("/get-product/:id", getProductById)

// Route For Update Product
/* =========================================================
   UPDATE PRODUCT
   PUT /api/product/update-product/PRODUCT_ID
========================================================= */
productRouter.put(
  "/update-product/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "datasheet", maxCount: 1 },
  ]),
  isAdminAuthenticated,
  authorizeRoles("admin"),
  updateProduct,
);

export default productRouter;
