const express = require("express");
const apiRouter = express.Router();

const peopleRouter = require("./peopleRoutes.js");
const relationRouter = require("./relationRoutes.js");


apiRouter.get("/hello", (req, res) => {
	// test route for react frontend
	// Simulate latency. Send response in 5s
	setTimeout(() => {
		res.json({message: "Hello from the backend!"});
	}, 5000);
});

apiRouter.get("/marriages/", (req, res) => {
	res.send("<h1>marriages</h1>");
});

apiRouter.use("/people/", peopleRouter);
apiRouter.use("/relations/", relationRouter);

module.exports = apiRouter;