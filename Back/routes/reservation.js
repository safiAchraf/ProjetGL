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

router.get("/", getAllReservations);
router.get("/user/:id", getAllReservationsByUser);
router.get("/confirmed", getConfirmedReservations);
router.get("/cancelled", getCancelledReservations);
router.get("/history", reservationHistory);
router.get("/available/:day/:month", getAvailableHours);
router.get("/:id", getReservationById);
router.post("/:serviceId", createReservation);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);



export default router;
