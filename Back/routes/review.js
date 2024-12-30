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

router.get("/", getAllReviews);
router.post("/:id", createNewReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);
router.get("/:id", getReview);

router.get("personalReviews", getPersonalReviews);
router.get("salonReviews/:id", getSalonReviews);
router.get("personalSalonReviews/:id", getPersonalSalonReviews);


export default router;