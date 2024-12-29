import express from "express";
import {
  creatNewService,
  updateService,
  deleteService,
  getAllServices,
  getService,
  getSalonServices,
  getSalonServicesByCategory
} from "../controllers/serviceController.js";



const router = express.Router();

router.get("/", getAllServices);
router.post("/", creatNewService);
router.get("/salon/:salonId/category/:category", getSalonServicesByCategory);
router.get("/salon/:id", getSalonServices);
router.put("/:id", updateService);
router.delete("/:id", deleteService);
router.get("/:id", getService);


export default router;