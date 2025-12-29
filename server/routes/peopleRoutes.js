import express from "express";
const peopleRouter = express.Router();

//const peopleController = require("../controllers/peopleController.js");
//const peopleModel = require("../models/peopleModel.js");
import db from "../models/liveDb.js";
import peopleController from "../controllers/peopleController.js";
import { PeopleModel } from "../models/peopleModel.js";
import { requirePermission } from "../utils/permissions.js";

const dataModel = new PeopleModel(db);

function inject(handler, dependency) {
    return handler(dependency);
}

// GET /api/people
peopleRouter.get("/", inject(peopleController.getPeopleList, dataModel));

// GET /api/people/:id
peopleRouter.get("/:id", inject(peopleController.getPersonById, dataModel));

// PATCH /api/people/:id
peopleRouter.patch("/:id", requirePermission("edit"), inject(peopleController.updatePersonById, dataModel));

// POST /api/people/
peopleRouter.post("/", requirePermission("edit"), inject(peopleController.createNewPerson, dataModel));

export default peopleRouter;