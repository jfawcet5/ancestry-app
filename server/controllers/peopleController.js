const { successResponse, errorResponse } = require("../utils/response.js");


// function that takes a data model (DI) and returns an express middleware
// function that uses the data model to retrieve the correct data. 
const getPersonById = (dataModel) => (req, res, next) => {
    console.log("Get Person By Id");
    console.log(req.params);
    dataModel.getPersonById(req.params.id)
        .then(person => {
            if (person === undefined || person === null) {
                console.log("controller get person by id. Received good response");
                console.log(person)
                throw new error("person not found");
            }
            console.log("controller get person by id. Received good response");
            console.log(person);
            let response = {
                success: true,
                data: person,
                message: "Person found"
            }
            res.json(response);
        })
        .catch(error => {
            console.log("controller. Something went wrong");
            console.log(error);
            let response = {
                success: false,
                data: null,
                error: {
                    code: "NOT_FOUND",
                    message: "Person not found"
                }
            }
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

module.exports = {
    getPersonById,
    createNewPerson,
    getPeopleList
}