import prisma from "../prisma/client.js";
import { v4 as uuidv4 } from "uuid";
import Chargily from "@chargily/chargily-pay";

const apiSecretKey = process.env.CHARGILY_SECRET_KEY;

const client = new Chargily.ChargilyClient({
	api_key: apiSecretKey,
	mode: "test",
});

const getAllReservations = async (req, res) => {
	try {
		const reservations = await prisma.$queryRaw`SELECT * FROM "Booking"`;
		res.json({ message: "All reservations", data: reservations });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getAllReservationsByUser = async (req, res) => {
	const customerId = req.user.id;
	try {
		const reservations =
			await prisma.$queryRaw`SELECT * FROM "Booking" WHERE "customerId" = ${customerId}`;
		res.json({ message: "All reservations", data: reservations });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getReservationById = async (req, res) => {
	const { id } = req.params;
	try {
		const [reservation] =
			await prisma.$queryRaw`SELECT * FROM "Booking" WHERE "id" = ${id}`;
		if (reservation) {
			res.json({ message: "Reservation successfully found", reservation });
		} else {
			res.status(404).json({ error: "Reservation not found" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const createReservation = async (req, res) => {
	const { startTime, endTime, coupon } = req.body;
	const customerId = req.user.id;
	const serviceId = req.params.serviceId;
	const [service] =
		await prisma.$queryRaw`SELECT * FROM "Service" WHERE id = ${serviceId}`;
	if (!service) {
		return res.status(404).json({ error: "Service not found" });
	}
	const salonId = service.salonId;
	if (!startTime || !endTime || !customerId || !serviceId || !salonId) {
		return res.status(400).json({ error: "All fields are required" });
	}

	const startDateTime = new Date(startTime);
	const endDateTime = new Date(endTime);

	const [existingReservation] = await prisma.$queryRaw`
    SELECT * FROM "Booking" WHERE "startTime" = ${startDateTime} AND "endTime" = ${endDateTime} AND "serviceId" = ${serviceId}`;

	if (existingReservation) {
		return res
			.status(400)
			.json({ error: "There is already a reservation for this time" });
	}
	if (startDateTime < new Date()) {
		return res
			.status(400)
			.json({ error: "You can't book a reservation in the past" });
	}
	if (startDateTime >= endDateTime) {
		return res
			.status(400)
			.json({ error: "End time must be greater than start time" });
	}

	try {
		let price = service.price;
		if (coupon) {
			const [existingCoupon] = await prisma.$queryRaw`
        SELECT * FROM "Coupon" WHERE code = ${coupon}`;
			if (!existingCoupon) {
				return res.status(404).json({ error: "Coupon not found" });
			}
			if (existingCoupon.salonId !== salonId) {
				return res
					.status(400)
					.json({ error: "Coupon not valid for this salon" });
			}
			price = price - existingCoupon.discount;
		}

		const [newReservation] = await prisma.$queryRaw`
      INSERT INTO "Booking" (id, "startTime", "endTime", "status", "customerId", "serviceId", "price", "salonId", "coupon", "createdAt", "updatedAt")
      VALUES (${uuidv4()}, ${startDateTime}, ${endDateTime}, 'PENDING', ${customerId}, ${serviceId}, ${price}, ${salonId}, ${coupon}, NOW(), NOW())
      RETURNING *`;

		const newCheckout = await client.createCheckout({
			amount: service.price,
			currency: "dzd",
			metadata: [{ reservationId: newReservation.id }],
		});

		res.status(201).json({
			message: "Reservation created",
			data: newReservation,
			checkout: newCheckout.checkout_url,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateReservation = async (req, res) => {
	const { id } = req.params;
	const { status } = req.body;

	try {
		const [updatedReservation] = await prisma.$queryRaw`
      UPDATE "Booking"
      SET 
        "status" = COALESCE(${status}, "status"), 
        "updatedAt" = NOW()
      WHERE id = ${id}
      RETURNING *`;
		if (updatedReservation) {
			res.json({
				message: "Reservation Updated successfully",
				updatedReservation,
			});
		} else {
			res.status(404).json({ error: "Reservation not found" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deleteReservation = async (req, res) => {
	const { id } = req.params;
	try {
		const [deletedReservation] =
			await prisma.$queryRaw`DELETE FROM "Booking" WHERE id = ${id} RETURNING *`;
		if (deletedReservation) {
			res.json({ message: "Reservation deleted successfully" });
		} else {
			res.status(404).json({ error: "Reservation not found" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export {
	getAllReservations,
	getReservationById,
	createReservation,
	updateReservation,
	deleteReservation,
	getAllReservationsByUser,
};
