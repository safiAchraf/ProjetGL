import prisma from "../prisma/client.js";

const getCategories = async (req, res) => {
	try {
		const categories = await prisma.$queryRaw`SELECT * FROM "Category"`;
		res.status(200).json({ categories });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export { getCategories };
