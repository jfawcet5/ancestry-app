// function that takes a data model (DI) and returns an express middleware
// function that uses the data model to retrieve the correct data. 
const getPersonById = (dataModel) => (req, res, next) => {
    console.log(req.params);
    dataModel.getPersonById(req.params.id)
        .then(person => {
            if (person === undefined || person === null) {
                throw new error("person not found");
            }
            let response = {
                success: true,
                data: person,
                message: "Person found"
            }
            res.json(response);
        })
        .catch(error => {
            let response = {
                success: false,
                data: null,
                error: {
                    code: "NOT_FOUND",
                    message: "Person not found"
                }
            }
            res.status(500).send(response);
        })
}

module.exports = {
    getPersonById
}