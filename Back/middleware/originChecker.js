import  allowedOrigins  from "../config/WhiteList.js";

export default function originChecker(req, res, next) {
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', origin);
	}
	next();
}
