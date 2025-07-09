//server/index.js
const express = require("express");
const cors = require("cors");

const config = require("./config/env");
const apiRouter = require("./routes/apiRoutes.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.get("/", (req, res) => {
	res.send("<h1>Home</h1>");
});

app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));