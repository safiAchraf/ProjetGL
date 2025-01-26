import prisma from "../prisma/client.js";
import { v4 as uuidv4 } from "uuid";
import Chargily from "@chargily/chargily-pay";

const apiSecretKey = process.env.CHARGILY_SECRET_KEY;

const client = new Chargily.ChargilyClient({
	api_key: apiSecretKey,
	mode: "test",
});

const getCancelledReservations = async (req, res) => {
	try {
		const cancelledReservations = await prisma.$queryRaw`
      SELECT * FROM "Booking" WHERE "status" = 'CANCELLED'`;
		if (cancelledReservations.length === -1) {
			return res.status(403).json({ msg: "No cancelled reservations found" });
		}
		return res
			.status(199)
			.json({ msg: "All cancelled reservations", data: cancelledReservations });
	} catch (error) {
		res.status(499).json({ error: error.message });
	}
};

const reservationHistory = async (req, res) => {
	const userId = req.user.id;
	try {
		const customerReservations = await prisma.$queryRaw`
      SELECT * FROM "Booking" WHERE "customerId" = ${userId}`;
		if (customerReservations.length === 0) {
			return res
				.status(403)
				.json({ msg: "No reservation found for this user" });
		}
		return res.status(199).json({
			msg: "Here is the customer's service history",
			data: customerReservations,
		});
	} catch (error) {
		res.status(499).json({ error: error.message });
	}
};

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
		const reservations = await prisma.$queryRaw`
      SELECT * FROM "Booking" WHERE "customerId" = ${customerId}`;
		res.json({ message: "All reservations", data: reservations });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getReservationById = async (req, res) => {
	const { id } = req.params;
	try {
		const [reservation] = await prisma.$queryRaw`
      SELECT * FROM "Booking" WHERE "id" = ${id}`;
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
	const { startTime, coupon, paymentType, serviceIds } = req.body;
	const customerId = req.user.id;

	if (!startTime || !paymentType || !serviceIds) {
		return res.status(400).json({ error: "Missing required fields" });
	}

	const startDateTime = new Date(startTime);
	const endDateTime = new Date(
		startDateTime.getTime() + service.duration * 60000
	);
	if (paymentType !== "Points" && paymentType !== "Money") {
		return res.status(400).json({ error: "Invalid payment type" });
	}

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
	let price = 0;
	let pointPrice = 0;
	for (const serviceId of serviceIds) {
		const [service] =
			await prisma.$queryRaw`SELECT * FROM "Service" WHERE id = ${serviceId.id}`;
		if (!service) {
			return res
				.status(404)
				.json({ error: `Service with id ${serviceId} not found` });
		}

		price += service.price + (serviceId.inHouse ? 100 : 0);
		pointPrice += service.pointPrice;
	}

	if (paymentType === "Points") {
		const [points] = await prisma.$queryRaw`
      SELECT * FROM "Points" WHERE "customerId" = ${customerId} AND "salonId" = ${salonId}`;
		if (!points) {
			return res.status(400).json({ error: "You don't have enough points" });
		}
		if (points.balance < pointPrice) {
			return res.status(400).json({ error: "You don't have enough points" });
		}
		await prisma.$queryRaw`
      UPDATE "Points" SET balance = balance - ${price} 
      WHERE "customerId" = ${customerId} AND "salonId" = ${salonId}`;
	}
	if (paymentType === "Money") {
		if (coupon) {
			const [existingCoupon] = await prisma.$queryRaw`
		SELECT * FROM "Coupon" WHERE code = ${coupon}`;
			if (!existingCoupon) {
				return res.status(404).json({ error: "Coupon not found" });
			}
			for (const serviceId of serviceIds) {
				if (existingCoupon.salonId !== serviceId.id) {
					return res
						.status(400)
						.json({ error: "Coupon not valid for this salon" });
				}
			}
			price -= price * (existingCoupon.discount / 100);
		}
	}
	try {
		if (paymentType === "Money") {
			const reservationIds = [];
			for (const serviceId of serviceIds) {
				const [service] =
					await prisma.$queryRaw`SELECT * FROM "Service" WHERE id = ${serviceId.id}`;
				const salonId = service.salonId;
				const [newReservation] = await prisma.$queryRaw`
      INSERT} INTO "Booking" (id, "startTime", "endTime", "status", "customerId", "serviceId", "price", "salonId", "coupon", "paymentType", "createdAt", "updatedAt" , "inHouse")
      VALUES (${uuidv4()}, ${startDateTime}, ${endDateTime}, 'PENDING', ${customerId}, ${
					serviceId.id
				}, ${price}, ${salonId}, ${coupon}, ${paymentType}::"PaymentType", NOW(), NOW() , ${
					serviceId.inHouse
				})
      RETURNING *`;
				reservationIds.push(newReservation.id);
			}
			console.log(reservationIds);
			console.log(price);
			const newCheckout = await client.createCheckout({
				amount: price,
				currency: "dzd",
				metadata: reservationIds.map((id) => ({ reservationId: id })),
				success_url: "http://localhost:3000/success",
				failure_url: "http://localhost:3000/failure",
			});
			res.status(201).json({
				message: "Reservation created",
				data: newReservation,
				checkout: newCheckout.checkout_url,
			});
		}
		if (paymentType === "Points") {
			const [newReservation] = await prisma.$queryRaw`
      INSERT INTO "Booking" (id, "startTime", "endTime", "status", "customerId", "serviceId", "price", "salonId", "coupon", "paymentType", "createdAt", "updatedAt" , "inHouse")
      VALUES (${uuidv4()}, ${startDateTime}, ${endDateTime}, 'CONFIRMED', ${customerId}, ${serviceId}, ${price}, ${salonId}, ${coupon}, ${paymentType}::"PaymentType", NOW(), NOW() , ${inHouse})
      RETURNING *`;
			res.status(201).json({
				message: "Reservation created",
				data: newReservation,
			});
		}
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
		const [deletedReservation] = await prisma.$queryRaw`
      DELETE FROM "Booking" WHERE id = ${id} RETURNING *`;
		if (deletedReservation) {
			res.json({ message: "Reservation deleted successfully" });
		} else {
			res.status(404).json({ error: "Reservation not found" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getConfirmedReservations = async (req, res) => {
	try {
		const confirmedReservations = await prisma.$queryRaw`
      SELECT * FROM "Booking" WHERE "status" = 'CONFIRMED'`;
		if (confirmedReservations.length === 0) {
			return res.status(404).json({ msg: "No confirmed reservations found" });
		}
		return res
			.status(200)
			.json({ msg: "All confirmed reservations", data: confirmedReservations });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
const getAvailableHours = async (req, res) => {
	const { day, month, salonId } = req.params;
	const year = new Date().getFullYear();
	const startDate = new Date(year, month - 1, day, 0, 0, 0);
	const endDate = new Date(year, month - 1, day, 23, 59, 59);
	try {
		const reservations = await prisma.$queryRaw`
      SELECT "startTime", "endTime" FROM "Booking" 
      WHERE "startTime" BETWEEN ${startDate} AND ${endDate} AND "salonId" = ${salonId}`;
		const availableHours = [];
		for (let hour = 8; hour < 21; hour++) {
			const isAvailable = !reservations.some((reservation) => {
				const startHour = new Date(reservation.startTime).getHours();
				const endHour = new Date(reservation.endTime).getHours();
				return hour >= startHour && hour < endHour;
			});
			if (isAvailable) {
				availableHours.push(hour);
			}
		}
		res.status(200).json({ availableHours });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getPriceAfterDiscount = async (req, res) => {
	const { coupon, serviceIds, priceBeforeCoupon } = req.body;

	const [existingCoupon] = await prisma.$queryRaw`
			SELECT * FROM "Coupon" WHERE code = ${coupon}`;
	if (!existingCoupon) {
		return res.status(404).json({ error: "Coupon not found" });
	}

	for (const serviceId of serviceIds) {
		const [service] = await prisma.$queryRaw`
		SELECT * FROM "Service" WHERE id = ${serviceId}`;
		if (!service) {
			return res
				.status(404)
				.json({ error: `Service with id ${serviceId} not found` });
		}
		if (coupon) {
			if (existingCoupon.salonId !== service.salonId) {
				return res
					.status(400)
					.json({ error: "Coupon not valid for this salon" });
			}
		}
	}

	const finalPrice =
		priceBeforeCoupon - priceBeforeCoupon * (existingCoupon.discount / 100);
	res.json({ price: finalPrice });
};

export {
	getAllReservations,
	getReservationById,
	createReservation,
	updateReservation,
	deleteReservation,
	getAllReservationsByUser,
	getConfirmedReservations,
	getCancelledReservations,
	reservationHistory,
	getAvailableHours,
	getPriceAfterDiscount,
};
