//server/index.js
const express = require("express");
const cors = require("cors");

const config = require("./config/env");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
	// test route
	// Simulate latency. Send response in 5s
	setTimeout(() => {
		res.json({message: "Hello from the backend!"});
	}, 5000);
});

app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));