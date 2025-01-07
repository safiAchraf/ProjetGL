import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUser);
router.put("/", updateUser);
router.delete("/", deleteUser);

export default router;
