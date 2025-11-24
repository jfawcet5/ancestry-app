import express from "express";
const apiRouter = express.Router();

//const peopleRouter = require("./peopleRoutes.js");
//const relationRouter = require("./relationRoutes.js");
//const treeRouter = require("./treeRoutes.js");
//const authenticationRouter = require("./authRoutes.js");
import peopleRouter from "./peopleRoutes.js"
import relationRouter from "./relationRoutes.js";
import treeRouter from "./treeRoutes.js";
import authenticationRouter from "./authRoutes.js";
import demoRouter from "./demoRoutes.js";
import {auth} from "../middleware/auth.js"


apiRouter.get("/hello", (req, res) => {
	// test route for react frontend
	// Simulate latency. Send response in 5s
	setTimeout(() => {
		res.json({message: "Hello from the backend!"});
	}, 5000);
});

apiRouter.use("/demo", demoRouter);
apiRouter.use("/auth", authenticationRouter);
apiRouter.use("/people/", auth, peopleRouter);
apiRouter.use("/relations/", relationRouter);
apiRouter.use("/tree", auth, treeRouter);

export default apiRouter;