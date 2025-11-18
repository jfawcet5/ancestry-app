import jwt from "jsonwebtoken";
import config from "../config/env.js";

//const { logger } = require("../utils/logger.js");
import logger from "../utils/logger.js";

export function auth(req, res, next) {
    logger.debug("Enter auth.auth");
    console.log(req.cookies);

    if (!req.cookies) return res.sendStatus(401);
    
    const token = req.cookies.token;

    if (!token) return res.sendStatus(401);

    try {
        const payload = jwt.verify(token, config.JWT_SECRET);

        req.user = payload;
        console.log(payload);
        next();
    }
    catch {
        return res.sendStatus(401);
    }
}

//export default { auth };