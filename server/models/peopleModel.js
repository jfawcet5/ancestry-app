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

function getPersonById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mockPeople[id]);
        }, 3000);
    });
}

module.exports = {
    getPersonById
}