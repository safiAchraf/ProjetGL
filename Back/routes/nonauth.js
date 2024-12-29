import express from "express";
import { getService , getSalonServicesByCategory , getSalonServices } from "../controllers/serviceController.js";
import { getAllSalons , getSalonById } from "../controllers/salonController.js";
import { getAvailableHours } from "../controllers/reservationController.js";
import { getCategories } from "../controllers/categoryController.js";



const router = express.Router();

router.get("/salons", getAllSalons);
router.get("/salon/:id", getSalonById);
router.get("/services/salon/:id", getSalonServices);
router.get("/service/:id", getService);
router.get("/services/:salonId/:category", getSalonServicesByCategory); 
router.get("/available/:salonId/:day/:month", getAvailableHours);
router.get("/categories", getCategories);

export default router;