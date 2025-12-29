import { formatResponse, sendResponse } from "./response.js";
import logger from "./logger.js";

export function requirePermission(permission) {
    return (req, res, next) => {
        logger.debug("Enter permissions.requirePermission");
        const permissions = req.user.role || null;

        if (!permissions || permissions !== permission) {
            logger.error("Incorrect roles for request");

            const errorResponse = {
                code: "FAILED",
                message: "Forbidden"
            };
    
            const response = formatResponse(false, "Invalid Request", null, errorResponse);
    
            sendResponse(res, 403, response);
            logger.debug("Exit permissions.requirePermission");
        }

        logger.debug("Permissions are valid");
        next();
    }
}