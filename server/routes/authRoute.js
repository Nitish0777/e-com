import express from "express";
import {
  loginController,
  registerController,
  testConteller,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/test", requireSignIn, isAdmin, testConteller);

export default router;
