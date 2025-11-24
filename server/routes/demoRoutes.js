import express from "express";
const demoRouter = express.Router();

//const peopleController = require("../controllers/peopleController.js");
//const peopleModel = require("../models/peopleModel.js");
import db from "../models/demoDb.js";
import peopleController from "../controllers/peopleController.js";
import { PeopleModel } from "../models/peopleModel.js";
import throttling from "../middleware/throttling.js";

const dataModel = new PeopleModel(db);

function inject(handler, dependency) {
    return handler(dependency);
}


demoRouter.use((req, res, next) => {
    if (req.method === "POST") {
        const middleware = throttling.restrictInsertByDbSize(db)
        return middleware(req, res, next);
    }
    next();
})

// GET /api/demo/people
demoRouter.get("/people/", inject(peopleController.getPeopleList, dataModel));

// GET /api/demo/people/:id
demoRouter.get("/people/:id", inject(peopleController.getPersonById, dataModel));

// PATCH /api/demo/people/:id
demoRouter.patch("/people/:id", inject(peopleController.updatePersonById, dataModel));

// POST /api/demo/people/
demoRouter.post("/people/", inject(peopleController.createNewPerson, dataModel));

// POST /api/demo/people/
demoRouter.get("/tree/:id", inject(peopleController.getTreeFocusData, dataModel));

export default demoRouter;