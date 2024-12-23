import express from "express";
import {
  loginController,
  registerController,
  logoutController,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/logout", logoutController);

export default router;
