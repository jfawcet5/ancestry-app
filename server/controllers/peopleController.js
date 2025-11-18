//const { formatResponse, sendResponse } = require("../utils/response.js");
//const { parseInputJson } = require("../utils/transformer.js");
import {formatResponse, sendResponse} from "../utils/response.js";
import { parseInputJson } from "../utils/transformer.js";

import logger from "../utils/logger.js";

function saveJsonPayload(bodyJSON, logFileName, logMessage="Saved file:") {
    const fileName = logger.saveToFile(logFileName, bodyJSON, "json");
    if (fileName) {
        logger.info(`${logMessage} ${fileName}`);
    }
}

function generateSearchFilters(queryString) {
    let flattened = parseInputJson(queryString);

    let filters = [];

    for (let key in flattened) {
        let filter = {
            target: key,
            value: flattened[key]
        }

        filters.push(filter);
    }

    return filters;
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

const createNewPerson = (dataModel) => (req, res, next) => {
    logger.debug("Enter peopleController.CreateNewPerson");
    const fileName = logger.saveToFile("createNewPerson_input", req.body, "json");
    if (fileName) {
        logger.info(`Request input saved to file: ${fileName}`);
    }
    dataModel.createNewPerson(req.body)
        .then(newPerson => {
            logger.info("New person created successfully");

            const response = formatResponse(true, "Success", newPerson);

            saveJsonPayload(response, "createNewPerson_output")
            sendResponse(res, 200, response);
        })
        .catch(error => {
            logger.error("Failed to create person", error.message);

            const errorResponse = {
                code: "FAILED",
                message: "Failed to create person"
            };

            const response = formatResponse(false, "Operation Failed", null, errorResponse);

            saveJsonPayload(response, "createNewPerson_output");
            sendResponse(res, 500, response);
        }
    );
}

const getPeopleList = (dataModel) => (req, res, next) => {
    logger.debug("Enter peopleController.GetPeopleList");
    logger.debug("Query filters", JSON.stringify(req.query));

    const filters = generateSearchFilters(req.query);

    saveJsonPayload(filters, "getPeopleList_input");

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    dataModel.getPeopleList(page, limit, filters)
        .then(result => {
            logger.info("Successfully retrieved person list");

            const response = formatResponse(true, "Success", result);

            saveJsonPayload(response, "getPeopleList_output");
            sendResponse(res, 200, response);
            logger.debug("Exit peopleController.GetPeopleList");
        })
        .catch(error => {
            logger.error("Failed to retrieve people list", error.message);

            const errorResponse = {
                code: "FAILED",
                message: "Failed to get person list"
            };

            const response = formatResponse(false, "Operation Failed", null, errorResponse);
            
            saveJsonPayload(response, "getPeopleList_output");
            sendResponse(res, 500, response);
            logger.debug("Exit peopleController.GetPeopleList");
        }
    );
}

const updatePersonById = (dataModel) => (req, res, next) => {
    logger.debug("Enter peopleController.UpdatePersonById", JSON.stringify(req.params));
    
    saveJsonPayload(req.body, "updatePersonById_input");

    dataModel.updatePersonById(req.params.id, req.body)
        .then(result => {
            logger.info("Successfully updated person");

            const response = formatResponse(true, "Success", result);
            
            saveJsonPayload(response, "updatePersonById_output")
            sendResponse(res, 200, response);

            logger.debug("Exit peopleController.UpdatePersonById");
        })
}



const data = [{
    id: 1,
    name: "jaf",
    children: [5, 6, 7],
}, {
    id: 2,
    name: "deh",
    children: [4, 5, 6, 7],
}, {
    id: 3,
    name: "das",
    children: [4],
}, {
    id: 4,
    name: "cos",
    children: [8, 9],
}, {
    id: 5,
    name: "auf",
    children: [10],
}, {
    id: 6, 
    name: "jof",
    children: [],
}, {
    id: 7,
    name: "abf",
    children: [],
}]

const data2 = {
    gen1: [
        {
            id: 0,
            name: "jaf",
            hasParents: true
        },
        {
            id: 1,
            name: "def",
            hasParents: true
        },
        {
            id: 2,
            name: "das",
            hasParents: false
        }
    ],
    gen2: [
        {
            id: 4,
            name: "cos",
            parents: [1, 2],
            hasChildren: true
        },
        {
            id: 5,
            name: "auf",
            parents: [0, 1],
            hasChildren: true
        },
        {
            id: 14,
            name: "jof",
            parents: [0, 1],
            hasChildren: false
        },
        {
            id: 7,
            name: "abf",
            parents: [0, 1],
            hasChildren: false
        }
    ]
}

const getTreeFocusData = (dataModel) => (req, res, next) => {
    logger.debug("Enter peopleController.GetTreeFocusData", JSON.stringify(req.params));

    dataModel.getTreeFocusData(req.params.id)
        .then(responseJSON => {
            if (responseJSON === undefined || responseJSON === null) {
                logger.error("Controller did not receive a valid response");
                logger.debug("Exit peopleController.GetTreeFocusData");
                throw new error("Bad DB response");
            }
            logger.info("Controller successfully received person from DB");

            const response = formatResponse(true, "Success", responseJSON);

            saveJsonPayload(response, "getTreeFocusData_output");
            sendResponse(res, 200, response);
            logger.debug("Exit peopleController.getTreeFocusData");
        })
        .catch(error => {
            logger.error(`Controller unable to fetch tree ${req.params.id}`, error.message);
            
            const errorResponse = {
                code: "NOT_FOUND",
                message: "Failed to retrieve tree data"
            };

            const response = formatResponse(false, "Operation Failed", null, errorResponse);

            saveJsonPayload(response, "getTreeFocusData_output");
            sendResponse(res, 500, response);

            logger.debug("Exit peopleController.GetTreeFocusData");
        })

    //const response = formatResponse(true, "Success", data2);

    //sendResponse(res, 200, response);
}


export default {
    getPersonById,
    createNewPerson,
    getPeopleList,
    updatePersonById,
    getTreeFocusData
}