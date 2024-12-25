import jwt from "jsonwebtoken";
import "dotenv/config";

export default function jwtVerify(req, res, next) {
	const token = req.cookies["authorization"];
	if (!token) {
		return res.status(401).json({ message: "Access denied", data: null });
	}
	try {
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		res.status(400).json({ message: "Invalid token", data: null });
	}
}
