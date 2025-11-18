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

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", apiRouter);

app.get("/", (req, res) => {
	res.send("<h1>Home</h1>");
});

app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));