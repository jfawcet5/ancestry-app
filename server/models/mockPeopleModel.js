const mockPeople = [{
    id: 1,
    name: {
        first: "Jane",
        middle: "",
        last: "Doe"
    },
    birth: "1940",
    death: "1980",
    relations: {
        mother: {
            id: 2,
            name: "Mary Major"
        },
        father: {
            id: 3,
            name: "Jack Doe"
        },
        spouses: [{
            id: 5,
            name: "Pat Lee"
        }],
        siblings: [{
            id: 4,
            name: "Sam Doe"
        }],
        children: [{
            id: 99,
            name: "Emma Lee"
        }, {
            id: 100,
            name: "Luke Lee"
        },{
            id: 101,
            name: "Billy Lee"
        },{
            id: 102,
            name: "Tommy Lee"
        },{
            id: 103,
            name: "George Lee"
        }]
    },
}, {
    id: 2,
    name: {
        first: "Mary",
        middle: "",
        last: "Major"
    },
    birth: "1920",
    death: "1960",
    relations: {
        mother: {
            id: 20,
            name: "Janice Deer"
        },
        father: {
            id: 30,
            name: "Bob Major"
        },
        spouses: [{
            id: 3,
            name: "Jack Doe",
            dates: {
                start: "1938"
            }
        }],
        siblings: [],
        children: [{
            id: 1,
            name: "Jane Doe"
        },{
            id: 4,
            name: "Sam Doe"
        }]
    },
}, {
    id: 3,
    name: {
        first: "Jack",
        middle: "",
        last: "Doe"
    },
    birth: "1910",
    death: "1970",
    relations: {
        mother: {
            id: 21,
            name: "Taylor Smith"
        },
        father: {
            id: 31,
            name: "Justin Doe"
        },
        spouses: [{
            id: 2,
            name: "Mary Major"
        }],
        siblings: [],
        children: [{
            id: 1,
            name: "Jane Doe"
        },{
            id: 4,
            name: "Sam Doe"
        }]
    },
},{
    id: 4,
    name: {
        first: "Sam",
        middle: "",
        last: "Doe"
    },
    birth: "1945",
    death: "1985",
    relations: {
        mother: {
            id: 2,
            name: "Mary Major"
        },
        father: {
            id: 3,
            name: "Jack Doe"
        },
        spouses: [],
        siblings: [{
            id: 1,
            name: "Jane Doe"
        }],
        children: []
    },
},{
    id: 5,
    name: {
        first: "Pat",
        middle: "",
        last: "Lee"
    },
    birth: "1942",
    death: "1982",
    relations: {
        mother: {
            id: 2,
            name: ""
        },
        father: {
            id: 3,
            name: ""
        },
        spouses: [{
            id: 1,
            name: "Jane Doe"
        }],
        siblings: [],
        children: [{
            id: 99,
            name: "Emma Lee"
        }, {
            id: 100,
            name: "Luke Lee"
        }]
    },
}];

let nextId = 6;

function getPersonById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (mockPeople.length < id) {
                console.log(`Bad request: ${id}`);
                reject("Person does not exist");
            }
            resolve(mockPeople[id-1]);
        }, 3000);
    });
}

function createNewPerson(newPersonData) {
    const newPerson = {
        id: nextId++,
        name: {
            first: newPersonData.firstName,
            middle: '',
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
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(newPerson);
        }, 1000);
    });
}

function getPeopleList(page, limit, filters) {
    console.log("Datamodel: Get people list");
    const startIndex = Math.min(page - 1, 0) * limit;
    const endIndex = startIndex + limit;

    let filteredData = mockPeople;

    /*
    filteredData = filteredData.filter(person => !filters.firstName || 
        person.name.first.toLowerCase().includes(filters.firstName.toLowerCase())
    );
    */

    filteredData = filteredData.filter(person => {
            return !filters.firstName || person.name.first.toLowerCase().includes(filters.firstName.toLowerCase());
        }
    );

    filteredData = filteredData.filter(person => {
        return !filters.lastName || person.name.last.toLowerCase().includes(filters.lastName.toLowerCase());
    }
);

    const peopleData = filteredData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredData.length / limit );

    const people = peopleData.map((element, index) => {
        return {
            id: element.id,
            name: element.name,
            birth: element.birth,
            death: element.death
        };
    });

    const result = {
        data: people,
        meta: {
            page: page,
            limit: limit,
            totalPages: totalPages,
            totalCount: filteredData.length
        }
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(result);
        }, 1000);
    });
}

module.exports = {
    getPersonById,
    createNewPerson,
    getPeopleList
}