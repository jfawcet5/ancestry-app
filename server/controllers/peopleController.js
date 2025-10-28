const { successResponse, errorResponse } = require("../utils/response.js");
const { logger } = require("../utils/logger.js");

// function that takes a data model (DI) and returns an express middleware
// function that uses the data model to retrieve the correct data. 
const getPersonById = (dataModel) => (req, res, next) => {
    logger.debug("Enter peopleController.GetPersonById", req.params);
    //console.log(req.params);
    dataModel.getPersonById(req.params.id)
        .then(person => {
            if (person === undefined || person === null) {
                //console.log("controller get person by id. Received good response");
                //console.log(person)
                logger.error("Controller did not receive a valid response");
                logger.debug("Exit peopleController.GetPersonById");
                throw new error("person not found");
            }
            //console.log("controller get person by id. Received good response");
            //console.log(person);
            logger.debug("Controller successfully received person from DB");
            let response = {
                success: true,
                data: person,
                message: "Person found"
            }

            logger.debug("Saving server response to file");
            const fileName = logger.saveToFile("getPersonById_output", response, "json");
            if (fileName) {
                logger.info(`Server response saved to file: ${fileName}`);
            }
            logger.debug("Exit peopleController.GetPersonById");
            res.json(response);
        })
        .catch(error => {
            //console.log("controller. Something went wrong");
            //console.log(error);
            logger.error(`Controller unable to fetch person ${req.params.id}`, error.message);
            let response = {
                success: false,
                data: null,
                error: {
                    code: "NOT_FOUND",
                    message: "Person not found"
                }
            }
            logger.debug("Saving server response to file");
            const fileName = logger.saveToFile("getPersonById_output", response, "json");
            if (fileName) {
                logger.info(`Server response saved to file: ${fileName}`);
            }
            logger.debug("Exit peopleController.GetPersonById");
            res.status(404).send(response);
        })
}

const createNewPerson = (dataModel) => (req, res, next) => {
    console.log("Create New Person");
    console.log(req.body);
    dataModel.createNewPerson(req.body)
        .then(newPerson => {
            res.json({
                success: true,
                data: newPerson,
                message: "Person created successfully"
            });
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                data: error,
                error: {
                    code: "FAILED",
                    message: "Failed to create person"
                }
            });
        }
    );
}

const getPeopleList = (dataModel) => (req, res, next) => {
    console.log("GET /api/people/");
    console.log(req.query);
    const filters = {
        firstName: req.query.firstName || null,
        lastName: req.query.lastName || null,
    };
    console.log("filters: ", filters)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    dataModel.getPeopleList(page, limit, filters)
        .then(result => {
            console.log("controller get people list. Received result from model");
            console.log(result);
            res.json({
                success: true,
                data: result,
                meta: {},
                message: "Success"
            });
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                data: error,
                error: {
                    code: "FAILED",
                    message: "Failed to create person list"
                }
            });
        }
    );
}

const updatePersonById = (dataModel) => (req, res, next) => {
    console.log("Controller update person by ID: ", req.params.id);
    console.log(req.body);
    dataModel.updatePersonById(req.params.id, req.body)
        .then(response => {
            res.json(response);
        })
}
    


module.exports = {
    getPersonById,
    createNewPerson,
    getPeopleList,
    updatePersonById
}