import jwt from "jsonwebtoken";
import config from "../config/env.js";

//const { logger } = require("../utils/logger.js");
import logger from "../utils/logger.js";

export function auth(req, res, next) {
    logger.debug("Enter auth.auth");
    console.log(req.cookies);

    logger.debug("Validating cookies");

    if (!req.cookies) {
        logger.error("No cookies set. User not authenticated");
        return res.sendStatus(401);
    }

    logger.debug("Validating tokens");
    
    const token = req.cookies.token;

    if (!token) {
        logger.error("No token set. User not authenticated");
        return res.sendStatus(401);
    }

    logger.debug("Verifying token validity");

    try {
        const payload = jwt.verify(token, config.JWT_SECRET);

        req.user = payload;
        logger.debug("User validated successfully");
        console.log(payload);
        next();
    }
    catch {
        logger.error("An error happened while authenticating user");
        return res.sendStatus(401);
    }
}

//export default { auth };