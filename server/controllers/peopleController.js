const { formatResponse, sendResponse } = require("../utils/response.js");
const { logger } = require("../utils/logger.js");



function saveJsonPayload(bodyJSON, logFileName, logMessage="Saved file:") {
    const fileName = logger.saveToFile(logFileName, bodyJSON, "json");
    if (fileName) {
        logger.info(`${logMessage} ${fileName}`);
    }
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
            logger.error("Failed to retrieve people list", error.message);

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
    const filters = {
        firstName: req.query.firstName || null,
        lastName: req.query.lastName || null,
    };
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
    
    saveJsonPayload(req.body, "updatePersonById_input")

    const fileName = logger.saveToFile("updatePersonById_input", req.body, "json");
    if (fileName) {
        logger.info(`Request input saved to file: ${fileName}`);
    }

    dataModel.updatePersonById(req.params.id, req.body)
        .then(result => {
            logger.info("Successfully updated person");

            const response = formatResponse(true, "Success", result);
            
            saveJsonPayload(response, "updatePersonById_output")
            sendResponse(res, 200, response);

            logger.debug("Exit peopleController.UpdatePersonById");
        })
}
    


module.exports = {
    getPersonById,
    createNewPerson,
    getPeopleList,
    updatePersonById
}