const express = require("express");
const peopleRouter = express.Router();
const peopleController = require("../controllers/peopleController.js");
const peopleModel = require("../models/peopleModel.js");

peopleRouter.get("/", (req, res) => {
    res.send("<h1>People</h1>");
});

function inject(handler, dependency) {
    return handler(dependency);
}

// GET /api/people/:id
peopleRouter.get("/:id", inject(peopleController.getPersonById, peopleModel));

module.exports = peopleRouter;