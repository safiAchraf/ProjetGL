import express from "express";
import dotenv from "dotenv";
import jwtVerify from "./middleware/jwtVerify.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";
import xss from "xss-clean";
import { errorHandler, notFound } from "./middleware/error.js";
import authRouter from "./routes/auth.js";
import salonRouter from "./routes/salon.js";
import chargilyRouter from "./routes/chargily.js";


// to do : Points systesm , search with filters , reviews, coupons




dotenv.config();


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


app.get("/", (req, res) => {
	res.json("Hello World");
});

app.use("/api/chargily", chargilyRouter);
app.use("/api/auth", authRouter);
app.use(jwtVerify);
app.use("/api/salons", salonRouter);




app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
