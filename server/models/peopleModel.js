const db = require("./db");
const { generateOutputPayload, parseInputJson } = require("../utils/transformer.js");
const { logger } = require("../utils/logger.js");

const mockPeople = [];

let nextId = 6;

function getPersonById(id) {
    logger.debug("Enter peopleModel.GetPersonById", id);

    return new Promise((resolve, reject) => {
        db.query("SELECT get_person_details_full($1) AS data", [id])
        .then(responseJSON => {
            if (responseJSON != null) {
                logger.debug("Received response from DB");

                data = responseJSON.rows[0].data;
    
                const result = generateOutputPayload(data);
                
                logger.debug("Exit peopleModel.GetPersonById", id);
                resolve(result);
            }
        })
        .catch((error => {
            logger.error("DB returned an error", error.message);
            logger.debug("Exit peopleModel.GetPersonById", id);
            reject(error);
        }));
    });
}

function createNewPerson(newPersonData) {
    logger.debug("Enter peopleModel.CreateNewPerson", id);
    const newPerson = {
        id: nextId++,
        name: {
            first: newPersonData.firstName,
            middle: newPersonData.middleName,
            last: newPersonData.lastName
        },
        birth: newPersonData.birthDate,
        death: newPersonData.deathDate,
        relations: {
            mother: {
                id: 22,
                name: ""
            },
            father: {
                id: 33,
                name: ""
            },
            spouses: [],
            siblings: [],
            children: []
        }
    };

    mockPeople.push(newPerson);

    const query = "SELECT create_person($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) AS id";
    const values = [newPersonData.firstName,
                    newPersonData.middleName,
                    newPersonData.lastName,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    newPersonData.gender
    ];

    db.query(query, values);
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(newPerson);
        }, 1000);
    });
}


function getPeopleList(page, limit, filters) {
    logger.debug("Enter peopleModel.GetPeopleList");

    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM a_person")
        .then(response => {
            if (response != null) {
                logger.debug("Model received valid response from DB");
                //console.log("non null response. Return promise");

                const results = [];

                for (let i = 0; i < response.rows.length; i++) {
                    results.push(generateOutputPayload(response.rows[i]));
                }

                resolve(results);
            }
        })
        .catch((error => {
            logger.error("Failed to query DB", error.message);
            //console.log(error);
            reject(error);
        }));
    });
}


function updatePersonById(id, patchJSON) {
    logger.debug("Enter peopleModel.UpdatePersonById");
    //console.log("Model update person by ID");
    //console.log("Transform input");
    const inputData = parseInputJson(patchJSON);
    //console.log(inputData);
    
    return new Promise((resolve, reject) => {
        db.query("SELECT update_person_details_partial($1, $2)", [id, inputData])
        .then(responseJSON => {
            if (responseJSON != null) {
                logger.debug("Model received valid response from DB");
                //console.log("non null response. Return promise");
                //console.log("Raw response: ");
                //console.log(responseJSON);
    
                resolve(null);
            }
        })
        .catch((error => {
            logger.error("Failed to update person", error.message);
            //console.log(error);
            reject(error);
        }));
    });
}

module.exports = {
    getPersonById,
    createNewPerson,
    getPeopleList,
    updatePersonById
}