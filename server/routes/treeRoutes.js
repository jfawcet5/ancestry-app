const express = require("express");
const treeRouter = express.Router();
const peopleController = require("../controllers/peopleController.js");
const peopleModel = require("../models/peopleModel.js");

function inject(handler, dependency) {
    return handler(dependency);
}

// GET /api/tree/:id
treeRouter.get("/:id", inject(peopleController.getTreeFocusData, peopleModel));

module.exports = treeRouter;