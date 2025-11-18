import express from "express";
const relationRouter = express.Router();

relationRouter.get("/", (req, res) => {
	res.send("<h1>relations</h1>");
});

export default relationRouter;