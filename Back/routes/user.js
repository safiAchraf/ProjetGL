import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get user information
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *       404:
 *         description: User not found
 */
router.get("/", getUser);

/**
 * @swagger
 * /api/user:
 *   put:
 *     summary: Update user information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNum:
 *                 type: string
 *     responses:
 *       200:
 *         description: User information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *       404:
 *         description: User not found
 */
router.put("/", updateUser);

/**
 * @swagger
 * /api/user:
 *   delete:
 *     summary: Delete user account
 *     responses:
 *       204:
 *         description: User account deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/", deleteUser);

export default router;
