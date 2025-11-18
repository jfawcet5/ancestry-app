import db from "./db.js";
//const { generateOutputPayload, parseInputJson } = require("../utils/transformer.js");
import { generateOutputPayload, parseInputJson } from "../utils/transformer.js";
import logger from "../utils/logger.js";


function createNewApplicationUser(email, username, invite, passwordHash) {
    logger.debug("Enter authenticationModel.createNewApplicationUser");
    const query = "SELECT create_user_from_invite($1,$2, $3, $4) as id";
    const values = [
        email, // email
        username, // username
        passwordHash, // password hash
        invite  // invite code
    ]
    return new Promise((resolve, reject) => {
        db.query(query, values)
        .then(response => {
            if (response != null) {
                console.log(response);
                let data = response.rows[0];
                console.log(data);
                resolve(data);
            }
        })
        .catch((error => {
            logger.error("DB returned an error", error.message);
            reject(error);
        }));
    })
}


function getApplicationUser(email, password) {
    logger.debug("Enter authenticationModel.getApplicationUser");
    console.log(email, password);
    const query = "SELECT get_application_user($1) as data";
    const values = [
        email // email
    ]

    return new Promise((resolve, reject) => {
        db.query(query, values)
        .then(response => {
            if (response != null) {
                console.log(response);
                let data = response.rows[0];
                console.log(data.data);
                resolve(data.data);
            }
        })
        .catch((error => {
            logger.error("DB returned an error", error.message);
            reject(error);
        }));
    })
}


















function getPersonById(id) {
    logger.debug("Enter peopleModel.GetPersonById", id);

    return new Promise((resolve, reject) => {
        db.query("SELECT get_person_details_full($1) AS data", [id])
        .then(responseJSON => {
            if (responseJSON != null) {
                logger.debug("Received response from DB");

                console.log(responseJSON);
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
    logger.debug("Enter peopleModel.CreateNewPerson");
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

    let [birthYear, birthMonth, birthDay] = (newPersonData.birthDate.split("/") || []).map(v => v === "" ? null : v);
    let [deathYear, deathMonth, deathDay] = (newPersonData.deathDate.split("/") || []).map(v => v === "" ? null : v);

    const query = "SELECT create_person($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) AS id";
    const values = [newPersonData.firstName,
                    newPersonData.middleName,
                    newPersonData.lastName,
                    birthYear,
                    birthMonth,
                    birthDay,
                    null, // birth location
                    deathYear,
                    deathMonth,
                    deathDay,
                    null, // death location
                    newPersonData.gender
    ];

    return new Promise((resolve, reject) => {
        db.query(query, values)
        .then(response => {
            if (response != null) {
                logger.debug("Model received valid response from DB");
                //console.log("non null response. Return promise");

                const results = response.rows[0];

                if (results != null) {
                    resolve({
                        ...results,
                        name: {
                            first: newPersonData.firstName,
                            middle: newPersonData.middleName,
                            last: newPersonData.lastName
                        }
                    });
                }
                else {
                    throw new Error("Failed to create person");
                }
            }
        })
        .catch((error => {
            logger.error("Failed to query DB", error.message);
            //console.log(error);
            reject(error);
        }));
    });


    
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
                    // iterate through filters
                    // check if rows[filter.target] == filter.value
                    let object = response.rows[i];

                    let matches = 0;

                    for (const filter of filters) {
                        let target = filter.target;
                        if (object[target] && object[target].toLowerCase() == filter.value.toLowerCase()) {
                            //results.push(generateOutputPayload(response.rows[i]));
                            matches++;
                        }
                    }

                    if (matches >= filters.length) {
                        results.push(generateOutputPayload(response.rows[i]));
                    }
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

function getTreeFocusData(id) {
    logger.debug("Enter peopleModel.GetTreeFocusData", id);

    return new Promise((resolve, reject) => {
        db.query("SELECT get_person_tree_snapshot_window($1) AS data", [id])
        .then(responseJSON => {
            if (responseJSON != null) {
                logger.debug("Received response from DB");

                console.log(responseJSON);
                data = responseJSON.rows[0].data;
                //console.log(data);
                
                logger.debug("Exit peopleModel.GetTreeFocusData", id);
                resolve(data);
            }
        })
        .catch((error => {
            logger.error("Failed to update person", error.message);
            console.log(error.stack)
            //console.log(error);
            reject(error);
        }));
    });
}

export default {
    createNewApplicationUser,
    getApplicationUser
}