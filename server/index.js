//server/index.js
const express = require("express");
const cors = require("cors");
const { logger } = require("./utils/logger.js");

const config = require("./config/env");
const apiRouter = require("./routes/apiRoutes.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
	logger.info("Incoming request", `${req.method} ${req.url}`);
	next();
})

app.use("/api", apiRouter);

app.get("/", (req, res) => {
	res.send("<h1>Home</h1>");
});

app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));