const express = require("express");
const peopleRouter = express.Router();

peopleRouter.get("/", (req, res) => {
    res.send("<h1>People</h1>");
})

module.exports = peopleRouter;