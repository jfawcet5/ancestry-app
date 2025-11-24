import config from "../config/env.js";

//const { logger } = require("../utils/logger.js");
import logger from "../utils/logger.js";

export const restrictInsertByDbSize = (db) => (req, res, next) => {
    logger.debug("throttling.restrictInsertByDbSize");
    if (req.method !== "POST") {
        logger.debug("Request is not a POST. Next()");
        return next();
    }

    const maxRows = config.MAX_DEMO_ROWS;
    logger.debug(`Max DB count: ${maxRows}`);

    try {
        db.query("SELECT COUNT(*) AS count FROM a_person")
        .then(result => {
            const count = result.rows[0].count;
            logger.debug(`Current DB count: ${count}`);

            if (count >= maxRows) {
                logger.error("Demo capacity reached. Blocking request");
                return res.status(403).json({
                    error: "Demo capacity reached. Please try again later"
                });
            }

            next();
        })
    }
    catch (err) {
        logger.error("Error checking DB row size", err.message);
        res.status(500);
    }
}

export default {
    restrictInsertByDbSize
}