import express from "express";
import dotenv from "dotenv";
import { jwtVerify } from "./middleware/jwtVerify.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimiting from "express-rate-limit";
import cloudinary from "cloudinary";
import { errorHandler, notFound } from "./middleware/error.js";



dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(
	cors({
		credentials: true,
		origin:
			process.env.NODE_ENV == "development"
				? "http://localhost:3500"
				: "someurl",
	})
);




app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use(hpp());

app.use(helmet());
app.use(xss());

app.use(
	rateLimiting({
		windowMs: 10 * 60 * 1000,
		max: 500,
	})
);

app.get("/", (req, res) => {
	res.json("Hello World");
});

app.use("/api/auth", authRouter);



app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
app.use(notFound);
app.use(errorHandler);
