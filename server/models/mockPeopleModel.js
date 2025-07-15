const mockPeople = [{
    id: "1",
    name: "jane doe",
    birth: "1940",
    death: "1980",
    parents: [
        {id: 10, name: "mary"},
        {id: 11, name: "bob"}
    ],
    spouses: [
        {id: 200, name: "mark", married: "1960", divorced: "1970"}
    ],
    children: [
        {id: 300, name: "emma doe"},
        {id: 301, name: "luke doe"}
    ]
}, {
    id: "2",
    name: "john deer"
}, {
    id: "3",
    name: "mary major"
}];

let nextId = 4;

function getPersonById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mockPeople[id-1]);
        }, 3000);
    });
}

function createNewPerson(newPersonData) {
    const newPerson = {
        id: nextId++,
        ...newPersonData
    };

    mockPeople.push(newPerson);
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(newPerson);
        }, 1000);
    });
}

function getPeopleList(page, limit) {
    console.log("Datamodel: Get people list");
    const startIndex = Math.min(page - 1, 0) * limit;
    const endIndex = startIndex + limit;

    const peopleData = mockPeople.slice(startIndex, endIndex);
    const totalPages = Math.ceil(mockPeople.length / limit );

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
            totalCount: mockPeople.length
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