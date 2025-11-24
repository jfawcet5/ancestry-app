import express from "express";
const treeRouter = express.Router();

//const peopleController = require("../controllers/peopleController.js");
//const peopleModel = require("../models/peopleModel.js");
import db from "../models/liveDb.js";
import peopleController from "../controllers/peopleController.js";
import { PeopleModel } from "../models/peopleModel.js";

const dataModel = new PeopleModel(db);

function inject(handler, dependency) {
    return handler(dependency);
}

// GET /api/tree/:id
treeRouter.get("/:id", inject(peopleController.getTreeFocusData, dataModel));

export default treeRouter;