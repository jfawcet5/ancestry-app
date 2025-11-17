require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 3001,
    LOG_LEVEL: process.env.LOG_LEVEL || "INFO",
    LOG_PATH: process.env.LOG_PATH || "",
};