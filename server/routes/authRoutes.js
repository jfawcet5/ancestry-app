import express from "express";
const authenticationRouter = express.Router();

import authController from "../controllers/authController.js";
import authenticationModel from "../models/authModel.js";

import {auth} from "../middleware/auth.js";
import logger from "../utils/logger.js";

function inject(handler, dependency) {
    return handler(dependency);
}

authenticationRouter.get("/me", auth, (req, res) => {
    logger.debug("Enter AuthenticationRouter.get", "/me");
    res.json(req.user);
});

authenticationRouter.post("/logout", (req, res) => {
    logger.debug("Enter AuthenticationRouter.logout");
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
        sameSite: "none"
    });
    res.json({message: "Logged Out"});
});

authenticationRouter.post("/login", inject(authController.getApplicationUser, authenticationModel));

authenticationRouter.post("/register", inject(authController.createNewApplicationUser, authenticationModel));


export default authenticationRouter;