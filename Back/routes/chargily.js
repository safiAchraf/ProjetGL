import bodyParser from "body-parser";
import express from "express";
import { verifySignature } from "@chargily/chargily-pay";
import prisma from "../prisma/client";

const API_SECRET_KEY = process.env.CHARGILY_SECRET_KEY;

const router = express.Router();

router.use(
	bodyParser.json({
		verify: (req, res, buf) => {
			req.rawBody = buf;
		},
	})
);

router.post("/webhook", async (req, res) => {
	const signature = req.get("signature") || "";
	const payload = req.rawBody;

	if (!signature) {
		console.log("Signature header is missing");
		res.sendStatus(400);
		return;
	}

	try {
		if (!verifySignature(payload, signature, API_SECRET_KEY)) {
			console.log("Signature is invalid");
			res.sendStatus(403);
			return;
		}
	} catch (error) {
		console.log(
			"Something happened while trying to process the request to the webhook"
		);
		res.sendStatus(403);
		return;
	}

	const event = req.body;
	switch (event.type) {
		case "checkout.paid":
			const checkout = event.data;
			console.log("im here");
			const reservationId = checkout.metadata[0].reservationId;
			const [reservation] = await prisma.$queryRaw`
        SELECT * FROM "Booking" WHERE "id" = ${reservationId}`;
			if (!reservation) {
				console.log("Reservation not found");
				res.sendStatus(404);
				return;
			}
			await prisma.$queryRaw`
        UPDATE "Booking" SET status = 'PAID' WHERE "id" = ${reservationId}`;
			console.log("Reservation updated successfully");
			break;
		case "checkout.failed":
			const failedCheckout = event.data;
			console.log(failedCheckout);
			break;

		case "checkout.expired":
			const expiredCheckout = event.data;
			console.log(expiredCheckout);
			break;
		default:
			console.log("Unknown event type");
	}
	res.sendStatus(200);

	console.log(event);

	res.sendStatus(200);
});

export default router;