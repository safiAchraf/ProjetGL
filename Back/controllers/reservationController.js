import prisma from "../prisma/client.js";
import { v4 as uuidv4 } from "uuid";
import Chargily from "@chargily/chargily-pay";

const apiSecretKey = process.env.CHARGILY_SECRET_KEY;

const client = new Chargily.ChargilyClient({
	api_key: apiSecretKey,
	mode: "test",
});

function toTitleCase(word) {
	return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
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
      SELECT * FROM "Booking" WHERE "customerId" = ${userId} LIMIT 5`;
		if (customerReservations.length === 0) {
			return res
				.status(403)
				.json({ msg: "No reservation found for this user" });
		}
		const reservations = customerReservations.map((reservation) => {
			const service = prisma.$queryRaw`SELECT * FROM "Service" WHERE id = ${reservation.serviceId}`;
			return {
				id: reservation.id,
				client: "client",
				service: service.name,
				amount: reservation.price,
				bookDate: reservation.startTime,
				status: toTitleCase(reservation.status),
			};
		});
		return res.status(199).json({
			msg: "Here is the customer's service history",
			data: reservations,
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
		SELECT 
		  *
		FROM "Booking"
		JOIN "Service" ON "Booking"."serviceId" = "Service".id
		WHERE "Booking"."customerId" = ${customerId}
	  `;
  
	  // Map to frontend format
	  const FrontReservations = reservations.map((reservation) => ({
		id: reservation.id,
		service: reservation.service_name,
		amount: reservation.price,
		bookDate: reservation.startTime,  
		status: reservation.status.charAt(0).toUpperCase() + 
			   reservation.status.slice(1).toLowerCase()
	  }));
  
	  res.json({ message: "All reservations", data: FrontReservations });
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

	if (!startTime || !paymentType || serviceIds.length === 0) {
		return res
			.status(400)
			.json({ error: "Missing required fields or invalid serviceIds" });
	}

	if (paymentType !== "Points" && paymentType !== "Money") {
		return res.status(400).json({ error: "Invalid payment type" });
	}

	const startDateTime = new Date(startTime);
	if (startDateTime < new Date()) {
		return res
			.status(400)
			.json({ error: "You can't book a reservation in the past" });
	}

	try {
		// Fetch all services at once
		const serviceIdsArray = serviceIds.map((s) => s.id);
		const services = await prisma.$queryRaw`
		SELECT * FROM "Service" WHERE id = ANY(${serviceIdsArray})`;

		if (services.length !== serviceIds.length) {
			return res.status(404).json({ error: "One or more services not found" });
		}

		const salonId = services[0].salonId; // Assuming all services belong to the same salon
		let totalPrice = 0;
		let totalPointPrice = 0;

		for (const serviceId of serviceIds) {
			const service = services.find((s) => s.id === serviceId.id);
			const endDateTime = new Date(
				startDateTime.getTime() + service.duration * 60000
			);

			// Check for conflicting reservations
			const [existingReservation] = await prisma.$queryRaw`
		  SELECT * FROM "Booking" 
		  WHERE "startTime" = ${startDateTime} AND "endTime" = ${endDateTime} AND "serviceId" = ${service.id}`;
			if (existingReservation) {
				return res
					.status(400)
					.json({
						error: `Service ${service.id} is already booked for this time`,
					});
			}

			totalPrice += service.price + (serviceId.inHouse ? 100 : 0);
			totalPointPrice += service.pointPrice;
		}

		// Handle payment with Points
		if (paymentType === "Points") {
			const [points] = await prisma.$queryRaw`
		  SELECT * FROM "Points" WHERE "customerId" = ${customerId} AND "salonId" = ${salonId}`;

			if (!points || points.balance < totalPointPrice) {
				return res.status(400).json({ error: "You don't have enough points" });
			}

			await prisma.$queryRaw`
		  UPDATE "Points" SET balance = balance - ${totalPointPrice} 
		  WHERE "customerId" = ${customerId} AND "salonId" = ${salonId}`;
		}

		// Handle payment with Money and coupon
		if (paymentType === "Money" && coupon) {
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

			totalPrice -= totalPrice * (existingCoupon.discount / 100);
		}

		// Create reservations
		const reservations = [];
		for (const serviceId of serviceIds) {
			const service = services.find((s) => s.id === serviceId.id);
			const endDateTime = new Date(
				startDateTime.getTime() + service.duration * 60000
			);

			const [newReservation] = await prisma.$queryRaw`
		  INSERT INTO "Booking" (id, "startTime", "endTime", "status", "customerId", "serviceId", "price", "salonId", "coupon", "paymentType", "createdAt", "updatedAt", "inHouse")
		  VALUES (${uuidv4()}, ${startDateTime}, ${endDateTime}, 'PENDING', ${customerId}, ${
				service.id
			}, ${
				service.price
			}, ${salonId}, ${coupon}, ${paymentType}::"PaymentType", NOW(), NOW(), ${
				serviceId.inHouse
			})
		  RETURNING *`;

			reservations.push(newReservation);
		}

		// Handle checkout for Money
		if (paymentType === "Money") {
			const checkout = await client.createCheckout({
				amount: totalPrice,
				currency: "dzd",
				metadata: reservations.map((r) => ({ reservationId: r.id })),
				success_url: "https://projet-gl-jet.vercel.app",
				failure_url: "https://projet-gl-jet.vercel.app",
			});

			return res.status(201).json({
				message: "Reservations created",
				checkout: checkout.checkout_url,
				reservations,
			});
		}

		res.status(201).json({
			message: "Reservations created",
			reservations,
		});
	} catch (error) {
		console.error(error);
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
