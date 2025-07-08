//server/index.js
const express = require("express");
const cors = require("cors");

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));