const db = require("./db");
const { formatResponse } = require("../utils/transformer.js");

const mockPeople = [];

let nextId = 6;

function getPersonById(id) {
    console.log("data model get person by id");

    return new Promise((resolve, reject) => {
        db.query("SELECT get_person_details_full($1) AS data", [id])
        .then(responseJSON => {
            if (responseJSON != null) {
                console.log("non null response. Return promise");
                console.log("Raw response: ");
                console.log(responseJSON);

                data = responseJSON.rows[0].data;
                console.log("DB result set:");
                console.log(data);
    
                const result = formatResponse(data);
    
                resolve(result);
            }
        })
        .catch((error => {
            console.log(error);
            reject(error);
        }));
    });
}

function createNewPerson(newPersonData) {
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

    const query = "SELECT create_person($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) AS id";
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
                    null
    ];

    db.query(query, values);
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(newPerson);
        }, 1000);
    });
}


function getPeopleList(page, limit, filters) {
    console.log("Datamodel: Get people list");

    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM a_person")
        .then(response => {
            if (response != null) {
                console.log("non null response. Return promise");

                const results = [];

                for (let i = 0; i < response.rows.length; i++) {
                    results.push(formatResponse(response.rows[i]));
                }

                resolve(results);
            }
        })
        .catch((error => {
            console.log(error);
            reject(error);
        }));
    });
}

module.exports = {
    getPersonById,
    createNewPerson,
    getPeopleList
}