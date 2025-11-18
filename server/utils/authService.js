import jwt from "jsonwebtoken";
import config from "../config/env.js";

import logger from "../utils/logger.js";

export function createToken(user) {
    return jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        config.JWT_SECRET,
        { expiresIn: "1d" }
    );
}