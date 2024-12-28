import express from "express";
import {
  creatNewService,
  updateService,
  deleteService,
  getAllServices,
  getService,
  getSalonServices
} from "../controllers/serviceController.js";



const router = express.Router();

router.get("/", getAllServices);
router.post("/:id", creatNewService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);
router.get("oneService/:id", getService);
router.get("manyFromSalon/:id", getSalonServices);


export default router;