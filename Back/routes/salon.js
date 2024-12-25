import express from "express";
import { getAllSalons, getSalonById, createSalon, updateSalon, deleteSalon , addSalonPictures , deleteSalonPicture } from "../controllers/salonController.js";



const router = express.Router();

router.get("/", getAllSalons);
router.delete("/pictures/:pictureId", deleteSalonPicture);
router.get("/:id", getSalonById);
router.post("/", createSalon);
router.put("/:id", updateSalon);
router.delete("/:id", deleteSalon);
router.post("/:id/pictures", addSalonPictures);


export default router;