//const express = require("express");
//const authenticationRouter = express.Router();
//const authenticationController = require("../controllers/authController.js");
//const authenticationModel = require("../models/authModel.js");
import express from "express";
const authenticationRouter = express.Router();

import authController from "../controllers/authController.js";
import authenticationModel from "../models/authModel.js";

import {auth} from "../middleware/auth.js";
import logger from "../utils/logger.js";

function inject(handler, dependency) {
    return handler(dependency);
}

// GET /api/people
//peopleRouter.get("/", inject(peopleController.getPeopleList, peopleModel));

// GET /api/people/:id
//peopleRouter.get("/:id", inject(peopleController.getPersonById, peopleModel));

// PATCH /api/people/:id
//peopleRouter.patch("/:id", inject(peopleController.updatePersonById, peopleModel));

// POST /api/people/
//peopleRouter.post("/", inject(peopleController.createNewPerson, peopleModel));

authenticationRouter.get("/me", auth, (req, res) => {
    logger.debug("Enter AuthenticationRouter.get", "/me");
    res.json(req.user);
});

authenticationRouter.post("/logout", (req, res) => {
    logger.debug("Enter AuthenticationRouter.logout");
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none"
    });
    res.json({message: "Logged Out"});
});

authenticationRouter.post("/login", inject(authController.getApplicationUser, authenticationModel));

authenticationRouter.post("/register", inject(authController.createNewApplicationUser, authenticationModel));


export default authenticationRouter;