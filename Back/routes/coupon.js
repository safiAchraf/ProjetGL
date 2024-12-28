import express from "express";
import {
  createNewCoupon,
  updateCoupon,
  deleteCoupon,
  getAllCoupons,
  getCoupon,
  getSalonCoupons
} from "../controllers/couponController.js";



const router = express.Router();

router.get("/", getAllCoupons);
router.post("/:id", createNewCoupon);
router.put("/:id", updateCoupon);
router.delete("/:id", deleteCoupon);
router.get("/:id", getCoupon);
router.get("salon/:id", getSalonCoupons);


export default router;