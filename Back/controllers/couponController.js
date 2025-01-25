import prisma from "../prisma/client.js";
import { v4 as uuidv4 } from "uuid";

const createNewCoupon = async (req, res) => {
	const ownerId = req.user.id;
	const { code, discount } = req.body;
	const [salon] =
		await prisma.$queryRaw` SELECT * FROM "Salon" WHERE "ownerId" = ${ownerId}`;
	const salonId = salon.id;
	if (!code || !discount) {
		return res.status(400).json({ msg: "Missing required fields" });
	}

	if (!salon) {
		return res.status(404).json({ error: "Salon not found" });
	}

	if (salon.ownerId !== ownerId) {
		return res
			.status(403)
			.json({
				error: "You are not authorized to create coupons for this salon",
			});
	}

	const [existingCoupon] = await prisma.$queryRaw`
    SELECT * FROM "Coupon" 
    WHERE "code" = ${code} AND "salonId" = ${salonId}`;

	if (existingCoupon) {
		return res.status(409).json({ error: "Coupon already exists" });
	}

	try {
		const newCoupon = await prisma.$queryRaw`
      INSERT INTO "Coupon" (
        id, 
        code, 
        discount, 
        "salonId", 
        "createdAt", 
        "updatedAt"
      )
      VALUES (
        ${uuidv4()}, 
        ${code}, 
        ${discount}, 
        ${salonId}, 
        NOW(), 
        NOW()
      )
      RETURNING *`;

		res.status(201).json({ msg: "Coupon created", data: newCoupon });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deleteCoupon = async (req, res) => {
	const id = req.params.id;
	const ownerId = req.user.id;

	try {
		const [coupon] =
			await prisma.$queryRaw`SELECT * FROM "Coupon" WHERE id = ${id}`;

		if (!coupon) {
			return res.status(404).json({ error: "Coupon not found" });
		}
		const [salon] =
			await prisma.$queryRaw`SELECT * FROM "Salon" WHERE id = ${coupon.salonId}`;

		if (salon.ownerId !== ownerId) {
			return res
				.status(403)
				.json({ error: "You are not authorized to delete this coupon" });
		}

		const deletedCoupon = await prisma.$queryRaw`
      DELETE FROM "Coupon" 
      WHERE id = ${id} 
      RETURNING *`;

		res.status(200).json({ msg: "Coupon deleted" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getCoupon = async (req, res) => {
	const id = req.params.id;
	try {
		const [coupon] =
			await prisma.$queryRaw`SELECT * FROM "Coupon" WHERE "id" = ${id}`;
		if (coupon) {
			res.json(coupon);
		} else {
			res.status(404).json({ error: "Coupon not found" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getSalonCoupons = async (req, res) => {
	try {
		const ownerId = req.user.id;

		const [salon] =
			await prisma.$queryRaw` SELECT * FROM "Salon" WHERE "ownerId" = ${ownerId}`;

		const salonId = salon.id;

		if (!salon) {
			return res.status(404).json({ error: "Salon not found" });
		}
		if (salon.ownerId !== req.user.id) {
			return res
				.status(403)
				.json({ error: "You are notauthorized to get this salon's coupons" });
		}

		const coupons = await prisma.$queryRaw`
      SELECT * FROM "Coupon" 
      WHERE "salonId" = ${salonId}`;

		if (coupons.length === 0) {
			return res.status(404).json({ error: "No coupons found for this salon" });
		}

		res.status(200).json({ msg: "All coupons of the salon", data: coupons });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getAllCoupons = async (req, res) => {
	try {
		const coupons = await prisma.$queryRaw`SELECT * FROM "Coupon"`;

		if (coupons.length === 0) {
			return res.status(404).json({ error: "No coupons found" });
		}

		res.status(200).json({ msg: "All coupons", data: coupons });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateCoupon = async (req, res) => {
	const id = req.params.id;
	const ownerId = req.user.id;
	const { code, discount } = req.body;

	try {
		const [coupon] = await prisma.$queryRaw`
      SELECT c.*, s."ownerId" 
      FROM "Coupon" c 
      JOIN "Salon" s ON c."salonId" = s.id 
      WHERE c.id = ${id}`;

		if (!coupon) {
			return res.status(404).json({ error: "Coupon not found" });
		}

		if (coupon.ownerId !== ownerId) {
			return res
				.status(403)
				.json({ error: "You are not authorized to update this coupon" });
		}

		const updatedCoupon = await prisma.$queryRaw`
      UPDATE "Coupon"
      SET 
        code = COALESCE(${code}, code),
        discount = COALESCE(${discount}, discount),
        "updatedAt" = NOW()
      WHERE id = ${id}
      RETURNING *`;

		res.status(200).json({ msg: "Coupon updated", data: updatedCoupon });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export {
	createNewCoupon,
	updateCoupon,
	deleteCoupon,
	getAllCoupons,
	getCoupon,
	getSalonCoupons,
};
