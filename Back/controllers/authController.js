import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid"; // Import uuid library

const loginController = async (req, res) => {
	const { email, password } = req.body;
	const [user] = await prisma.$queryRaw`
    SELECT * FROM "User" WHERE "email" = ${email}
  `;
	if (!user) {
		return res
			.status(400)
			.json({ message: "No user found with this email", data: null });
	}
	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword) {
		return res.status(400).json({ data: null, message: "Invalid credentials" });
	}

	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});

	res
		.cookie("authorization", token, {
			httpOnly: true,
			sameSite: "None",
			secure: true,
			domain: "projet-gl-jet.vercel.app", // Add your Vercel domain
			maxAge: 24 * 60 * 60 * 1000, // e.g., 24 hours in milliseconds
		})
		.json({ data: user, message: "login successfully" });
};

const registerController = async (req, res) => {
	const { name, email, password, phoneNum } = req.body;
	if (!name || !email || !password || !phoneNum) {
		return res
			.status(400)
			.json({ data: null, message: "All fields are required" });
	}
	const alreadyExists = await prisma.$queryRaw`
    SELECT * FROM "User" WHERE "email" = ${email}
  `;
	if (alreadyExists.length > 0) {
		return res.status(400).json({ data: null, message: "User already exists" });
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const [user] = await prisma.$queryRaw`
    INSERT INTO "User" (id, email, password, name, "phoneNumber", "createdAt", "updatedAt")
    VALUES (${uuidv4()}, ${email}, ${hashedPassword}, ${name}, ${phoneNum}, now(), now())
    RETURNING *
  `;

	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});

	res
		.cookie("authorization", token, {
			httpOnly: true,
			sameSite: "None",
			secure: true,
			maxAge: 24 * 60 * 60 * 1000, // e.g., 24 hours in milliseconds
		})
		.json({ data: user, message: "user created successfully" })
		.status(201);
};

const logoutController = (req, res) => {
	res
		.clearCookie("authorization")
		.json({ data: null, message: "Logged out successfully" });
};

const checkAuth = async (req, res) => {
	const token = req.cookies.authorization;
	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const [user] = await prisma.$queryRaw`
	  SELECT * FROM "User" WHERE id = ${decoded.id}
	`;
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		res.status(200).json({ message: "Authorized" });
	} catch (error) {
		return res.status(401).json({ message: "Unauthorized" });
	}
};

export { loginController, registerController, logoutController, checkAuth };
