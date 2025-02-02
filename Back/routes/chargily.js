import bodyParser from "body-parser";
import express from "express";
import { verifySignature } from "@chargily/chargily-pay";
import prisma from "../prisma/client.js";

const apiSecretKey = process.env.CHARGILY_SECRET_KEY;


const router = express.Router();

router.use(
	bodyParser.json({
		verify: (req, res, buf) => {
			req.rawBody = buf;
		},
	})
);
router.get("/succuss", (req, res) => {
	res.json("Your payment was successful");
});

router.get("/fail", (req, res) => {
	res.json("Your payment failed");
});


router.post("/webhook", async (req, res) => {
	const signature = req.get("signature") || "";
	const payload = req.rawBody;
	console.log("Webhook received");

	if (!signature) {
		console.log("Signature header is missing");
		res.sendStatus(400);
		return;
	}
	console.log("Signature header is present");

	try {
		if (!verifySignature(payload, signature, apiSecretKey)) {
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
			const reservationId = checkout.metadata;
			for (let i = 0; i < checkout.metadata.length; i++) {
				const reservationId = checkout.metadata[i].reservationId;
				const [reservation] = await prisma.$queryRaw`
		  SELECT * FROM "Reservation" WHERE id = ${reservationId}`;
				if (reservation) {
					await prisma.$queryRaw`
			UPDATE "Reservation" SET "status" = 'paid' WHERE id = ${reservationId}`;
				}
			}

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
