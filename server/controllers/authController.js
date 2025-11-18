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
        sendResponse(res, 200, response);
    })
}

const getApplicationUser = (dataModel) => (req, res, next) => {
    logger.debug("Enter AuthenticationController.getApplicationUser");
    logger.debug(JSON.stringify(req.body));
    const {email, password} = req.body;
    console.log(email, password);

    dataModel.getApplicationUser(email, password)
    .then(response => {
        if (!response) {
            throw new Error("");
        }

        const user = response;

        return bcrypt.compare(password, user.password_hash).then(valid => ({valid, user}))
    })
    .then(({valid, user}) => {
        if (!valid) {
            throw new Error("");
        }

        const token = createToken(user);
        console.log(token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24
        });

        res.json({message: "success"});
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
    })
}



// function that takes a data model (DI) and returns an express middleware
// function that uses the data model to retrieve the correct data. 
const getPersonById = (dataModel) => (req, res, next) => {
    logger.debug("Enter peopleController.GetPersonById", JSON.stringify(req.params));
    //console.log(req.params);
    dataModel.getPersonById(req.params.id)
        .then(person => {
            if (person === undefined || person === null) {
                logger.error("Controller did not receive a valid response");
                logger.debug("Exit peopleController.GetPersonById");
                throw new error("person not found");
            }
            logger.info("Controller successfully received person from DB");

            const response = formatResponse(true, "Success", person);

            saveJsonPayload(response, "getPersonById_output");
            sendResponse(res, 200, response);
            logger.debug("Exit peopleController.GetPersonById");
        })
        .catch(error => {
            logger.error(`Controller unable to fetch person ${req.params.id}`, error.message);
            
            const errorResponse = {
                code: "NOT_FOUND",
                message: "Failed to retrieve person"
            };

            const response = formatResponse(false, "Operation Failed", null, errorResponse);

            saveJsonPayload(response, "getPersonById_output");
            sendResponse(res, 500, response);

            logger.debug("Exit peopleController.GetPersonById");
        })
}


export default {
    createNewApplicationUser,
    getApplicationUser
}