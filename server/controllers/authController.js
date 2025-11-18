//const { formatResponse, sendResponse } = require("../utils/response.js");
//const { parseInputJson } = require("../utils/transformer.js");
//const bcrypt = require("bcryptjs");
import {formatResponse, sendResponse } from "../utils/response.js";
import bcrypt from "bcryptjs";

//const { createToken } = require("../utils/authService.js");
//const { logger } = require("../utils/logger.js");
import {createToken} from "../utils/authService.js";
import logger from "../utils/logger.js";

function saveJsonPayload(bodyJSON, logFileName, logMessage="Saved file:") {
    const fileName = logger.saveToFile(logFileName, bodyJSON, "json");
    if (fileName) {
        logger.info(`${logMessage} ${fileName}`);
    }
}

const createNewApplicationUser = (dataModel) => (req, res, next) => {
    logger.debug("Enter AuthenticationController.createNewApplicationUser");
    logger.debug(JSON.stringify(req.body));
    const {email, username, password, invite} = req.body;

    bcrypt.hash(password, 10)
    .then(hash => {
        return dataModel.createNewApplicationUser(email, username, invite, hash);
    })
    .then(response => {
        logger.debug("Enter AuthenticationController.createNewApplicationUser");
        sendResponse(res, 200, response);
    })
}

const getApplicationUser = (dataModel) => (req, res, next) => {
    logger.debug("Enter AuthenticationController.getApplicationUser");
    logger.debug(JSON.stringify(req.body));
    const {email, password} = req.body;
    //console.log(email, password);

    dataModel.getApplicationUser(email, password)
    .then(response => {
        if (!response) {
            logger.error("Invalid response received from data model");
            throw new Error("");
        }

        logger.debug("Received a response from data model. Comparing verifying credentials");

        const user = response;

        return bcrypt.compare(password, user.password_hash).then(valid => ({valid, user}))
    })
    .then(({valid, user}) => {
        if (!valid) {
            logger.error("Invalid user credentials provided");
            throw new Error("");
        }

        logger.debug("Validated user. Setting cookie");

        const token = createToken(user);
        console.log(token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24
        });

        res.json({message: "success"});
        logger.debug("Exit AuthenticationController.getApplicationUser");
    })
    .catch(error => {
        logger.error("Failed to create person", error.message);

        const errorResponse = {
            code: "FAILED",
            message: error.message
        };

        const response = formatResponse(false, "Operation Failed", null, errorResponse);

        //saveJsonPayload(response, "createNewPerson_output");
        sendResponse(res, 500, response);
        logger.debug("Exit AuthenticationController.getApplicationUser");
    })
}


export default {
    createNewApplicationUser,
    getApplicationUser
}