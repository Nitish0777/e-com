import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductsController,
  getSingleProductController,
  productPhotoController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
import { get } from "mongoose";

const router = express.Router();

//router
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//get all products
router.get("/get-products", getProductsController);

//get single product
router.get("/get-products/:slug", getSingleProductController);

//get photo
router.get("/products-photo/:pid", productPhotoController);

export default router;
