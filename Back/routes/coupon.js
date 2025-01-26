import express from "express";
import {
  createNewCoupon,
  updateCoupon,
  deleteCoupon,
  getAllCoupons,
  getCoupon,
  getSalonCoupons
} from "../controllers/couponController.js";

const router = express.Router();


/**
 * @swagger
 * /api/coupons/salon/{id}:
 *   get:
 *     summary: Get all coupons for a salon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The salon ID
 *     responses:
 *       200:
 *         description: All coupons for the salon retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       code:
 *                         type: string
 *                       discount:
 *                         type: number
 *                       salonId:
 *                         type: string
 *       404:
 *         description: Salon not found or no coupons found for this salon
 *       403:
 *         description: Unauthorized to get this salon's coupons
 */
router.get("/salon", getSalonCoupons);

/**
 * @swagger
 * /api/coupons:
 *   get:
 *     summary: Get all coupons
 *     responses:
 *       200:
 *         description: All coupons retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       code:
 *                         type: string
 *                       discount:
 *                         type: number
 *                       salonId:
 *                         type: string
 *       404:
 *         description: No coupons found
 */
router.get("/", getAllCoupons);

/**
 * @swagger
 * /api/coupons/{id}:
 *   post:
 *     summary: Create a new coupon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The salon ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               discount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Coupon created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     code:
 *                       type: string
 *                     discount:
 *                       type: number
 *                     salonId:
 *                       type: string
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Salon not found
 *       409:
 *         description: Coupon already exists
 */
router.post("/", createNewCoupon);

/**
 * @swagger
 * /api/coupons/{id}:
 *   put:
 *     summary: Update a coupon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The coupon ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               discount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Coupon updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     code:
 *                       type: string
 *                     discount:
 *                       type: number
 *                     salonId:
 *                       type: string
 *       404:
 *         description: Coupon not found
 *       403:
 *         description: Unauthorized to update this coupon
 */
router.put("/:id", updateCoupon);

/**
 * @swagger
 * /api/coupons/{id}:
 *   delete:
 *     summary: Delete a coupon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The coupon ID
 *     responses:
 *       200:
 *         description: Coupon deleted successfully
 *       404:
 *         description: Coupon not found
 *       403:
 *         description: Unauthorized to delete this coupon
 */
router.delete("/:id", deleteCoupon);

/**
 * @swagger
 * /api/coupons/{id}:
 *   get:
 *     summary: Get a coupon by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The coupon ID
 *     responses:
 *       200:
 *         description: Coupon retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 code:
 *                   type: string
 *                 discount:
 *                   type: number
 *                 salonId:
 *                   type: string
 *       404:
 *         description: Coupon not found
 */
router.get("/:id", getCoupon);



export default router;