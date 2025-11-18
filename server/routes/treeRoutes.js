import express from "express";
const treeRouter = express.Router();

//const peopleController = require("../controllers/peopleController.js");
//const peopleModel = require("../models/peopleModel.js");
import peopleController from "../controllers/peopleController.js";
import peopleModel from "../models/peopleModel.js";

function inject(handler, dependency) {
    return handler(dependency);
}

// GET /api/tree/:id
treeRouter.get("/:id", inject(peopleController.getTreeFocusData, peopleModel));

export default treeRouter;