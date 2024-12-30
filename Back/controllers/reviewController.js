import prisma from "../prisma/client.js";
import { v4 as uuidv4 } from "uuid";

const createNewReview = async (req, res) => {
	const salonId = req.params.id;
	const customerId = req.user.id;
	const { rating, comment } = req.body;

	if (!rating || !comment) {
		return res.status(400).json({ msg: "Missing required fields" });
	}

	try {
		const [salon] =
			await prisma.$queryRaw`SELECT * FROM "Salon" WHERE "id" = ${salonId}`;

		if (!salon) {
			return res.status(404).json({ msg: "Salon not found" });
		}

		if (salon.ownerId === customerId) {
			return res.status(401).json({ msg: "You can't review your own salon" });
		}

		const newReview = await prisma.$queryRaw`
      INSERT INTO "Review" (
        id, 
        rating, 
        comment, 
        "customerId", 
        "salonId", 
        "createdAt", 
        "updatedAt"
      )
      VALUES (
        ${uuidv4()}, 
        ${rating}, 
        ${comment}, 
        ${customerId}, 
        ${salonId}, 
        NOW(), 
        NOW()
      )
      RETURNING *`;

		const newRating =
			salon.rating === null ? rating : (salon.rating + rating) / 2;

		await prisma.$queryRaw`
      UPDATE "Salon" 
      SET rating = ${newRating} 
      WHERE id = ${salonId}`;

		res.status(201).json({ msg: "Review posted", data: newReview });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateReview = async (req, res) => {
	const id = req.params.id;
	const customerId = req.user.id;
	const { rating, comment } = req.body;

	const review =
		await prisma.$queryRaw`SELECT * FROM "Review" WHERE id = ${id}`;
	if (review.length === 0) {
		return res.status(404).json({ error: "no review found" });
	}

	if (customerId != review[0].customerId) {
		return res.status(401).json({
			msg: "You are not authorized to update comments other than yours",
		});
	}

	if (rating) {
		if (review[0].rating == 0) {
			const newRate = rating;
		} else {
			const updatedRate = Math.floor((review[0].rating + rating) / 2);
		}
	}

	try {
		const updatedReview = await prisma.$queryRaw`
      UPDATE "Review"
      SET 
        rating = COALESCE(${newRate}, rating), 
        comment = COALESCE(${comment}, comment), 
        "updatedAt" = NOW()
      WHERE id = ${id}
      RETURNING *`;
		if (updatedReview) {
			res.status(200).json({ msg: "Review updated", data: updatedReview });
		} else {
			res.status(404).json({ error: "Review not found" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deleteReview = async (req, res) => {
	const id = req.params.id;
	const customerId = req.user.id;

	try {
		const review =
			await prisma.$queryRaw`SELECT * FROM "Review" WHERE id = ${id}`;

		if (customerId != review[0].customerId) {
			return res.status(401).json({
				msg: "You are not authorized to delete comments other than yours",
			});
		}

		const deletedReview =
			await prisma.$queryRaw`DELETE FROM "Review" WHERE id = ${id} RETURNING *`;
		if (deletedReview.length > 0) {
			res.status(200).json({ msg: "Review deleted" });
		} else {
			res.status(404).json({ error: "Review not found" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getAllReviews = async (req, res) => {
	try {
		const reviews = await prisma.$queryRaw`SELECT * FROM "Review"`;

		if (reviews.length === 0) {
			return res.status(404).json({ error: "Reviews not found" });
		}

		res.status(200).json({ msg: "All Reviews", data: reviews });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getReview = async (req, res) => {
	const id = req.params.id;
	try {
		const [review] =
			await prisma.$queryRaw`SELECT * FROM "Review" WHERE "id" = ${id}`;
		if (review) {
			res.json(review);
		} else {
			res.status(404).json({ error: "Review not found" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getPersonalReviews = async (req, res) => {
	try {
		const id = req.user.id;
		const reviews = await prisma.$queryRaw`
      SELECT * FROM "Review" 
      WHERE "customerId" = ${id}`;
		if (reviews.length === 0) {
			return res.status(404).json({ error: "You haven't made any reviews" });
		}

		res.status(200).json({ msg: "All reviews you have made", data: reviews });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getSalonReviews = async (req, res) => {
	try {
		const salonId = req.params.id;
		const reviews = await prisma.$queryRaw`
      SELECT * FROM "Review" 
      WHERE "salonId" = ${salonId}`;
		if (reviews.length === 0) {
			return res
				.status(404)
				.json({ error: "No reviews have been made about this salon" });
		}

		res.status(200).json({ msg: "All reviews you have made", data: reviews });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getPersonalSalonReviews = async (req, res) => {
	try {
		const salonId = req.params.id;
		const customerId = req.user.id;
		const reviews = await prisma.$queryRaw`
      SELECT * FROM "Review" 
      WHERE "salonId" = ${salonId} 
      AND "customerId" = ${customerId}`;
		if (reviews.length === 0) {
			return res
				.status(404)
				.json({ error: "You haven't made any reviews about this salon" });
		}

		res
			.status(200)
			.json({ msg: "All reviews you have made for this salon", data: reviews });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export {
	createNewReview,
	updateReview,
	deleteReview,
	getAllReviews,
	getReview,
	getSalonReviews,
	getPersonalSalonReviews,
	getPersonalReviews,
};
