import jwt from "jsonwebtoken";
import config from "../config/env.js";

//const { logger } = require("../utils/logger.js");
import logger from "../utils/logger.js";


export function auth(req, res, next) {
    logger.debug("Enter auth.auth");

    const authHeader = req.headers["authorization"];
    console.log(req.headers);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        logger.error("User not authenticated. No Authorization header set");
        return res.sendStatus(401);
    }

    const token = authHeader.split(" ")[1];

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