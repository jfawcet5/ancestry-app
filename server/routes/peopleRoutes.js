const express = require("express");
const peopleRouter = express.Router();
const peopleController = require("../controllers/peopleController.js");
const peopleModel = require("../models/mockPeopleModel.js");

function inject(handler, dependency) {
    return handler(dependency);
}

// GET /api/people
peopleRouter.get("/", inject(peopleController.getPeopleList, peopleModel));

// GET /api/people/:id
peopleRouter.get("/:id", inject(peopleController.getPersonById, peopleModel));

// POST /api/people/
peopleRouter.post("/", inject(peopleController.createNewPerson, peopleModel));

module.exports = peopleRouter;