import prisma from "../prisma/client.js";
import { v4 as uuidv4 } from "uuid";

const createNewCoupon = async (req, res)=>{
  const salonId = req.params.id
  const ownerId = req.user.id;
  const {code , discount } = req.body

  if (
    !code || 
    !discount
  ){
    return res.status(400).json({ msg: "Missing required fields" });
  }

  const salon = await prisma.$queryRaw`SELECT * FROM "Salon" WHERE id = ${salonId}`
  if (salon[0].ownerId !== ownerId) {
    return res
      .status(403)
      .json({ error: "You are not authorized to create this Coupon" });
  }


  const [existinCoupon] = await prisma.$queryRaw`
  SELECT * FROM "Coupon" WHERE "code" = ${code} AND "salon" = ${salonId}`
  if(existinCoupon) {
    return res.status(409).json({ error : "coupon already excists"})
  }

  try{
    const newCoupon = await prisma.$queryRaw`
    INSERT INTO "Coupon" (id, "code", "discount", "salon", "createdAt", "updatedAt")
    VALUES (${uuidv4()}, ${code}, ${discount}, ${salonId}, NOW(), NOW())
    RETURNING *`

    res.status(201).json({ msg : "coupon created", data:newCoupon})
  }catch (error){
    res.status(500).json({error : error.message})
  }
}



const updateCoupon = async (req, res)=>{
  const id = req.params.id
  const ownerId = req.user.id;
  const {
    code, 
    discount, 
    salonId,
  } = req.body;
  const coupon = await prisma.$queryRaw`SELECT * FROM "Coupon" WHERE id = ${id}`;
  if (coupon.length === 0) {
    return res.status(404).json({ error: "Coupon not found" });
  }

  const salon = await prisma.$queryRaw`SELECT * FROM "Coupon" WHERE id = ${coupon.salon}`
  if (salon[0].ownerId !== ownerId) {
    return res
      .status(403)
      .json({ error: "You are not authorized to update this Coupon" });
  }


  try {
    const updatedCoupon = await prisma.$queryRaw`
      UPDATE "Coupon"
      SET 
        code = COALESCE(${code}, code), 
        discount = COALESCE(${discount}, discount), 
        salon = COALESCE(${salonId}, salon), 
        "updatedAt" = NOW()
      WHERE id = ${id}
      RETURNING *`;
    if (updatedCoupon) {
      res.status(200).json({msg : "Coupon updated", data : updatedCoupon});
    } else {
      res.status(404).json({ error: "Coupon not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const deleteCoupon = async (req, res) => {
  const id = req.params.id
  const ownerId = req.user.id;

  try {
    const coupon = await prisma.$queryRaw`SELECT * FROM "Coupon" WHERE id = ${id}`
    const salon = await prisma.$queryRaw`SELECT * FROM "Salon" WHERE id = ${coupon.salon}`
    if (coupon[0].ownerId !== ownerId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this Coupon" });
    }
  
    const deletedCoupon = await prisma.$queryRaw`DELETE FROM "Coupon" WHERE id = ${id} RETURNING *`
    if (deletedCoupon.length > 0) {
      res.status(200).json({ msg: "Coupon deleted" })
    } else {
      res.status(404).json({ error: "Coupon not found" })
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



const getAllCoupons = async (req, res) => {
  try {
    const coupon = await prisma.$queryRaw`SELECT * FROM "Coupon"`

    if(coupon.length===0){
      return res.status(404).json({ error: "Coupon not found" })
    }

    res.status(200).json({msg: "All Coupons", data: coupon})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



const getCoupon = async (req, res) => {
  const id = req.params.id
  try {
    const [coupon] = await prisma.$queryRaw`SELECT * FROM "Coupon" WHERE "id" = ${id}`;
    if (coupon) {
      res.json(coupon);
    } else {
      res.status(404).json({ error: "Coupon not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const getSalonCoupons = async (req, res) => {
  try {
    const salonId = req.params.id
    const salon = await prisma.$queryRaw`SELECT * FROM "Salon" WHERE "id" = ${salonId}`
    if(salon.length===0){
      return res.status(404).json({ error: "salon not found" })
    }
    const coupons = await prisma.$queryRaw`SELECT * FROM "Coupon" WHERE "salon" = ${salonId}`

    if(coupons.length===0){
      return res.status(404).json({ error: "Coupons not found" })
    }

    res.status(200).json({msg: "All Coupons of the salon", data: coupons})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



export {
  createNewCoupon,
  updateCoupon,
  deleteCoupon,
  getAllCoupons,
  getCoupon,
  getSalonCoupons
}