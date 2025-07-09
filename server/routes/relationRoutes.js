const express = require("express");
const relationRouter = express.Router();

relationRouter.get("/", (req, res) => {
	res.send("<h1>relations</h1>");
});

module.exports = relationRouter;