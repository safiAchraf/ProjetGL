import express from "express";
import {
  loginController,
  registerController,
  logoutController,
  checkAuth,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/logout", logoutController);
router.get("/check", checkAuth);

export default router;
