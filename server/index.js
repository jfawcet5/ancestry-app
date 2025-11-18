//server/index.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
//const cors = require("cors");
//const cookieParser = require("cookie-parser");
import logger from "./utils/logger.js";

import config from "./config/env.js";
//const apiRouter = require("./routes/apiRoutes.js");
import apiRouter from "./routes/apiRoutes.js";

const allowedOrigins = ["https://jfawcet5.github.io/ancestry-app/", "https://jfawcet5.github.io/", "https://jfawcet5.github.io", "http://localhost:3000"]

const app = express();

app.use((req, res, next) => {
	logger.info("Incoming request", `${req.method} ${req.url}`);
	next();
})

app.use(cors({
	origin: function(origin, callback) {
		logger.debug("CORS evaluating: ", origin);
		
		if (!origin) {
			logger.debug("Valid empty origin");
			return callback(null, true);
		} 

		if (allowedOrigins.indexOf(origin) !== -1) {
			logger.debug("Valid origin");
			callback(null, true);
		}
		else {
			logger.debug("Denied request")
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api", apiRouter);

app.get("/", (req, res) => {
	res.send("<h1>Home</h1>");
});

app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));