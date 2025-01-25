import express from "express";
import {
  createNewReview,
  updateReview,
  deleteReview,
  getAllReviews,
  getReview,
  getSalonReviews,
  getPersonalSalonReviews,
  getPersonalReviews
} from "../controllers/reviewController.js";

const router = express.Router();

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all reviews
 *     responses:
 *       200:
 *         description: All reviews retrieved successfully
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
 *                       rating:
 *                         type: number
 *                       comment:
 *                         type: string
 *                       customerId:
 *                         type: string
 *                       salonId:
 *                         type: string
 *       404:
 *         description: No reviews found
 */
router.get("/", getAllReviews);

/**
 * @swagger
 * /api/reviews/{id}:
 *   post:
 *     summary: Create a new review
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
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created successfully
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
 *                     rating:
 *                       type: number
 *                     comment:
 *                       type: string
 *                     customerId:
 *                       type: string
 *                     salonId:
 *                       type: string
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Salon not found
 *       401:
 *         description: Unauthorized to review own salon
 */
router.post("/:id", createNewReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Update a review
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review updated successfully
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
 *                     rating:
 *                       type: number
 *                     comment:
 *                       type: string
 *                     customerId:
 *                       type: string
 *                     salonId:
 *                       type: string
 *       404:
 *         description: Review not found
 *       401:
 *         description: Unauthorized to update this review
 */
router.put("/:id", updateReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The review ID
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 *       401:
 *         description: Unauthorized to delete this review
 */
router.delete("/:id", deleteReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The review ID
 *     responses:
 *       200:
 *         description: Review retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 rating:
 *                   type: number
 *                 comment:
 *                   type: string
 *                 customerId:
 *                   type: string
 *                 salonId:
 *                   type: string
 *       404:
 *         description: Review not found
 */
router.get("/:id", getReview);

/**
 * @swagger
 * /api/reviews/personalReviews:
 *   get:
 *     summary: Get all personal reviews
 *     responses:
 *       200:
 *         description: All personal reviews retrieved successfully
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
 *                       rating:
 *                         type: number
 *                       comment:
 *                         type: string
 *                       customerId:
 *                         type: string
 *                       salonId:
 *                         type: string
 *       404:
 *         description: No personal reviews found
 */
router.get("/personalReviews", getPersonalReviews);

/**
 * @swagger
 * /api/reviews/salonReviews/{id}:
 *   get:
 *     summary: Get all reviews for a salon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The salon ID
 *     responses:
 *       200:
 *         description: All reviews for the salon retrieved successfully
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
 *                       rating:
 *                         type: number
 *                       comment:
 *                         type: string
 *                       customerId:
 *                         type: string
 *                       salonId:
 *                         type: string
 *       404:
 *         description: No reviews found for this salon
 */
router.get("/salonReviews/:id", getSalonReviews);

/**
 * @swagger
 * /api/reviews/personalSalonReviews/{id}:
 *   get:
 *     summary: Get all personal reviews for a salon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The salon ID
 *     responses:
 *       200:
 *         description: All personal reviews for the salon retrieved successfully
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
 *                       rating:
 *                         type: number
 *                       comment:
 *                         type: string
 *                       customerId:
 *                         type: string
 *                       salonId:
 *                         type: string
 *       404:
 *         description: No personal reviews found for this salon
 */
router.get("/personalSalonReviews/:id", getPersonalSalonReviews);

export default router;