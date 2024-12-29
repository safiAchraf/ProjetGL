import express from "express";
import { getService , getSalonServicesByCategory  } from "../controllers/serviceController.js";
import { getAllSalons , getSalonById } from "../controllers/salonController.js";
import { getAvailableHours } from "../controllers/reservationController.js";



const router = express.Router();

router.get("/salons", getAllSalons);
router.get("/salon/:id", getSalonById);
router.get("/services/:id", getService);
router.get("/services/:salonId/:category", getSalonServicesByCategory); 
router.get("/available/:day/:month", getAvailableHours);

export default router;