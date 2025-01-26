import express from "express";
import { getService, getSalonServicesByCategory, getSalonServices } from "../controllers/serviceController.js";
import { getAllSalons, getSalonById } from "../controllers/salonController.js";
import { getAvailableHours } from "../controllers/reservationController.js";
import { getCategories } from "../controllers/categoryController.js";
import { getSalonReviews } from "../controllers/reviewController.js";

const router = express.Router();

/**
 * @swagger
 * /api/nonauth/salons:
 *   get:
 *     summary: Get all salons
 *     responses:
 *       200:
 *         description: All salons retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       address:
 *                         type: string
 *                       city:
 *                         type: string
 *                       phoneNumber:
 *                         type: string
 *                       rating:
 *                         type: number
 *                       pictures:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             url:
 *                               type: string
 *       404:
 *         description: No salons found
 */
router.get("/salons", getAllSalons);

/**
 * @swagger
 * /api/nonauth/salon/{id}:
 *   get:
 *     summary: Get a salon by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The salon ID
 *     responses:
 *       200:
 *         description: Salon retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 address:
 *                   type: string
 *                 city:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 rating:
 *                   type: number
 *                 pictures:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       url:
 *                         type: string
 *       404:
 *         description: Salon not found
 */
router.get("/salon/:id", getSalonById);

/**
 * @swagger
 * /api/nonauth/services/salon/{id}:
 *   get:
 *     summary: Get all services for a salon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The salon ID
 *     responses:
 *       200:
 *         description: All services for the salon retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                       pointPrice:
 *                         type: number
 *                       duration:
 *                         type: number
 *                       salonId:
 *                         type: string
 *                       categoryId:
 *                         type: string
 *                       inHouse:
 *                         type: boolean
 *       404:
 *         description: Salon not found or no services found for this salon
 */
router.get("/services/salon/:id", getSalonServices);

/**
 * @swagger
 * /api/nonauth/service/{id}:
 *   get:
 *     summary: Get a service by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The service ID
 *     responses:
 *       200:
 *         description: Service retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 pointPrice:
 *                   type: number
 *                 duration:
 *                   type: number
 *                 salonId:
 *                   type: string
 *                 categoryId:
 *                   type: string
 *                 inHouse:
 *                   type: boolean
 *       404:
 *         description: Service not found
 */
router.get("/service/:id", getService);

/**
 * @swagger
 * /api/nonauth/services/{salonId}/{category}:
 *   get:
 *     summary: Get all services for a salon by category
 *     parameters:
 *       - in: path
 *         name: salonId
 *         required: true
 *         schema:
 *           type: string
 *         description: The salon ID
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: The category name
 *     responses:
 *       200:
 *         description: All services for the salon by category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                       pointPrice:
 *                         type: number
 *                       duration:
 *                         type: number
 *                       salonId:
 *                         type: string
 *                       categoryId:
 *                         type: string
 *                       inHouse:
 *                         type: boolean
 *       404:
 *         description: Salon or category not found, or no services found for this category
 */
router.get("/services/:salonId/:category", getSalonServicesByCategory);

/**
 * @swagger
 * /api/nonauth/available/{salonId}/{day}/{month}:
 *   get:
 *     summary: Get available hours for a salon on a specific day
 *     parameters:
 *       - in: path
 *         name: salonId
 *         required: true
 *         schema:
 *           type: string
 *         description: The salon ID
 *       - in: path
 *         name: day
 *         required: true
 *         schema:
 *           type: integer
 *         description: The day of the month
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *         description: The month (1-12)
 *     responses:
 *       200:
 *         description: Available hours retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 availableHours:
 *                   type: array
 *                   items:
 *                     type: integer
 *       404:
 *         description: No available hours found for this salon on the specified day
 */
router.get("/available/:salonId/:day/:month", getAvailableHours);

/**
 * @swagger
 * /api/nonauth/categories:
 *   get:
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: All categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *       404:
 *         description: No categories found
 */
router.get("/categories", getCategories);

/**
 * @swagger
 * /api/nonauth/reviews/{salonId}:
 *   get:
 *     summary: Get all reviews for a salon
 *     parameters:
 *       - in: path
 *         name: salonId
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
router.get("/reviews/:salonId", getSalonReviews);

export default router;