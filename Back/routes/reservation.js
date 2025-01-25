import express from "express";
import {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
  getAllReservationsByUser,
  getConfirmedReservations,
  getCancelledReservations,
  reservationHistory,
  getAvailableHours,
} from "../controllers/reservationController.js";

const router = express.Router();

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Get all reservations
 *     responses:
 *       200:
 *         description: All reservations retrieved successfully
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
 *                       startTime:
 *                         type: string
 *                       endTime:
 *                         type: string
 *                       status:
 *                         type: string
 *                       customerId:
 *                         type: string
 *                       serviceId:
 *                         type: string
 *                       price:
 *                         type: number
 *                       salonId:
 *                         type: string
 *                       coupon:
 *                         type: string
 *                       paymentType:
 *                         type: string
 *                       inHouse:
 *                         type: boolean
 *       404:
 *         description: No reservations found
 */
router.get("/", getAllReservations);

/**
 * @swagger
 * /api/reservations/user:
 *   get:
 *     summary: Get all reservations by user
 *     responses:
 *       200:
 *         description: All reservations by user retrieved successfully
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
 *                       startTime:
 *                         type: string
 *                       endTime:
 *                         type: string
 *                       status:
 *                         type: string
 *                       customerId:
 *                         type: string
 *                       serviceId:
 *                         type: string
 *                       price:
 *                         type: number
 *                       salonId:
 *                         type: string
 *                       coupon:
 *                         type: string
 *                       paymentType:
 *                         type: string
 *                       inHouse:
 *                         type: boolean
 *       404:
 *         description: No reservations found for this user
 */
router.get("/user", getAllReservationsByUser);

/**
 * @swagger
 * /api/reservations/confirmed:
 *   get:
 *     summary: Get all confirmed reservations
 *     responses:
 *       200:
 *         description: All confirmed reservations retrieved successfully
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
 *                       startTime:
 *                         type: string
 *                       endTime:
 *                         type: string
 *                       status:
 *                         type: string
 *                       customerId:
 *                         type: string
 *                       serviceId:
 *                         type: string
 *                       price:
 *                         type: number
 *                       salonId:
 *                         type: string
 *                       coupon:
 *                         type: string
 *                       paymentType:
 *                         type: string
 *                       inHouse:
 *                         type: boolean
 *       404:
 *         description: No confirmed reservations found
 */
router.get("/confirmed", getConfirmedReservations);

/**
 * @swagger
 * /api/reservations/cancelled:
 *   get:
 *     summary: Get all cancelled reservations
 *     responses:
 *       200:
 *         description: All cancelled reservations retrieved successfully
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
 *                       startTime:
 *                         type: string
 *                       endTime:
 *                         type: string
 *                       status:
 *                         type: string
 *                       customerId:
 *                         type: string
 *                       serviceId:
 *                         type: string
 *                       price:
 *                         type: number
 *                       salonId:
 *                         type: string
 *                       coupon:
 *                         type: string
 *                       paymentType:
 *                         type: string
 *                       inHouse:
 *                         type: boolean
 *       404:
 *         description: No cancelled reservations found
 */
router.get("/cancelled", getCancelledReservations);

/**
 * @swagger
 * /api/reservations/history:
 *   get:
 *     summary: Get reservation history for the user
 *     responses:
 *       200:
 *         description: Reservation history retrieved successfully
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
 *                       startTime:
 *                         type: string
 *                       endTime:
 *                         type: string
 *                       status:
 *                         type: string
 *                       customerId:
 *                         type: string
 *                       serviceId:
 *                         type: string
 *                       price:
 *                         type: number
 *                       salonId:
 *                         type: string
 *                       coupon:
 *                         type: string
 *                       paymentType:
 *                         type: string
 *                       inHouse:
 *                         type: boolean
 *       404:
 *         description: No reservation history found for this user
 */
router.get("/history", reservationHistory);

/**
 * @swagger
 * /api/reservations/available/{salonId}/{day}/{month}:
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
 * /api/reservations/{id}:
 *   get:
 *     summary: Get a reservation by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The reservation ID
 *     responses:
 *       200:
 *         description: Reservation retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 startTime:
 *                   type: string
 *                 endTime:
 *                   type: string
 *                 status:
 *                   type: string
 *                 customerId:
 *                   type: string
 *                 serviceId:
 *                   type: string
 *                 price:
 *                   type: number
 *                 salonId:
 *                   type: string
 *                 coupon:
 *                   type: string
 *                 paymentType:
 *                   type: string
 *                 inHouse:
 *                   type: boolean
 *       404:
 *         description: Reservation not found
 */
router.get("/:id", getReservationById);

/**
 * @swagger
 * /api/reservations/{serviceId}:
 *   post:
 *     summary: Create a new reservation
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         required: true
 *         schema:
 *           type: string
 *         description: The service ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startTime:
 *                 type: string
 *               coupon:
 *                 type: string
 *               paymentType:
 *                 type: string
 *               inHouse:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     startTime:
 *                       type: string
 *                     endTime:
 *                       type: string
 *                     status:
 *                       type: string
 *                     customerId:
 *                       type: string
 *                     serviceId:
 *                       type: string
 *                     price:
 *                       type: number
 *                     salonId:
 *                       type: string
 *                     coupon:
 *                       type: string
 *                     paymentType:
 *                       type: string
 *                     inHouse:
 *                       type: boolean
 *       400:
 *         description: Missing required fields or invalid data
 *       404:
 *         description: Service or coupon not found
 */
router.post("/:serviceId", createReservation);

/**
 * @swagger
 * /api/reservations/{id}:
 *   put:
 *     summary: Update a reservation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The reservation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reservation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedReservation:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     startTime:
 *                       type: string
 *                     endTime:
 *                       type: string
 *                     status:
 *                       type: string
 *                     customerId:
 *                       type: string
 *                     serviceId:
 *                       type: string
 *                     price:
 *                       type: number
 *                     salonId:
 *                       type: string
 *                     coupon:
 *                       type: string
 *                     paymentType:
 *                       type: string
 *                     inHouse:
 *                       type: boolean
 *       404:
 *         description: Reservation not found
 */
router.put("/:id", updateReservation);

/**
 * @swagger
 * /api/reservations/{id}:
 *   delete:
 *     summary: Delete a reservation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The reservation ID
 *     responses:
 *       200:
 *         description: Reservation deleted successfully
 *       404:
 *         description: Reservation not found
 */
router.delete("/:id", deleteReservation);

export default router;
