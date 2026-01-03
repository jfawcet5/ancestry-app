//const { formatResponse, sendResponse } = require("../utils/response.js");
//const { parseInputJson } = require("../utils/transformer.js");
//const bcrypt = require("bcryptjs");
import {formatResponse, sendResponse } from "../utils/response.js";
import bcrypt from "bcryptjs";
import config from "../config/env.js";

//const { createToken } = require("../utils/authService.js");
//const { logger } = require("../utils/logger.js");
import {createToken} from "../utils/authService.js";
import logger from "../utils/logger.js";
import { json } from "express";
//import { sign } from "jsonwebtoken";

function saveJsonPayload(bodyJSON, logFileName, logMessage="Saved file:") {
    const fileName = logger.saveToFile(logFileName, bodyJSON, "json");
    if (fileName) {
        logger.info(`${logMessage} ${fileName}`);
    }
}

const createNewApplicationUser = (dataModel) => (req, res, next) => {
    logger.debug("Enter AuthenticationController.createNewApplicationUser");
    logger.debug(JSON.stringify(req.body));
    const {email, username, password, invite} = req.body;

    bcrypt.hash(password, 10)
    .then(hash => {
        return dataModel.createNewApplicationUser(email, username, invite, hash);
    })
    .then(response => {
        logger.debug("Enter AuthenticationController.createNewApplicationUser");
        sendResponse(res, 200, response);
    })
}

const getApplicationUser = (dataModel) => (req, res, next) => {
    logger.debug("Enter AuthenticationController.getApplicationUser");
    logger.debug(JSON.stringify(req.body));
    const {email, password} = req.body;
    //console.log(email, password);

    dataModel.getApplicationUser(email, password)
    .then(response => {
        if (!response) {
            logger.error("Invalid response received from data model");
            throw new Error("");
        }

        logger.debug("Received a response from data model. Comparing verifying credentials");

        const user = response;

        return bcrypt.compare(password, user.password_hash).then(valid => ({valid, user}))
    })
    .then(({valid, user}) => {
        if (!valid) {
            logger.error("Invalid user credentials provided");
            throw new Error("");
        }

        logger.debug("Validated user. Setting cookie");

        const token = createToken(user);
        console.log(token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24
        });

        res.json({message: "success"});
        logger.debug("Exit AuthenticationController.getApplicationUser");
    })
    .catch(error => {
        logger.error("Failed to create person", error.message);

        const errorResponse = {
            code: "FAILED",
            message: error.message
        };

        const response = formatResponse(false, "Operation Failed", null, errorResponse);

        //saveJsonPayload(response, "createNewPerson_output");
        sendResponse(res, 500, response);
        logger.debug("Exit AuthenticationController.getApplicationUser");
    })
}

const handleOAuthTokenExchange = (dataModel) => (req, res, next) => {
    logger.debug("Enter AuthenticationController.handleOAuthTokenExchange");
    logger.debug(JSON.stringify(req.body));
    const {code, codeVerifier, flow} = req.body;

    const params = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: config.AUTH0_CLIENT_ID,
        code_verifier: codeVerifier,
        code: code,
        scope: "openid profile",
        redirect_uri: config.AUTH0_REDIRECT,
    })

    logger.debug("Auth0 exchange parameters: ", params.toString());

    // Request body for Auth0 API call
    const reqBody = {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString()
    };

    logger.debug("Token exchange payload", JSON.stringify(reqBody));

    // PKCE token exchange
    fetch(`https://${config.AUTH0_DOMAIN}/oauth/token`, reqBody)
    .then(res => {
        logger.debug("Raw Auth0 response:");
        console.log(res);
        if (res.status !== 200) {
            logger.error(" Unsuccessful Token Exchange", res.status);
            return res.json().then(data => {
                throw new Error(data.error);
            })
        }
        return res.json();
    })
    .then(tokenData => {
        if (!tokenData.id_token) {
            logger.error("No id token provided", JSON.stringify(tokenData))
            throw new Error("Error: Authentication failed.");
        }

        const idToken = JSON.parse(
            Buffer.from(tokenData.id_token.split(".")[1], "base64")
        );

        logger.debug("OAuth token", JSON.stringify(idToken));

        const oauthUserId = idToken.sub;

        const flowType = typeof flow === "string" ? JSON.parse(flow).type : flow.type;

        logger.debug("Flow", flow);
        logger.debug("Flow type", flowType);
        logger.debug("Flow constructor", flow.constructor.name);
        logger.debug("Flow instanceof URLSearchParams", flow instanceof URLSearchParams);

        // During signup flow, create the new user in the DB and associate with the OAuth User ID
        if (flowType === "signup") {
            logger.debug("signup flow. Create user");

            const sessionId = typeof flow === "string" ? JSON.parse(flow).sessionId : flow.sessionId;

            // Get the invite code associated with the signup session
            dataModel.getInviteFromSession(sessionId)
            .then(invite => {
                const inviteCode = invite.code;
                logger.debug("invite code from session", inviteCode);

                // Create the new user with the invite code and OAuth user ID
                return dataModel.createUserFromInvite(oauthUserId, inviteCode)
                        .then(user => ({ invite, user }));
            })
            .then(({invite, user}) => {
                logger.debug("created user", user.id);
                logger.debug("invite", JSON.stringify(invite));

                // Format response
                const userData = {
                    id: user.id,
                    role: invite.role
                }

                logger.debug("create token input: id/role", JSON.stringify(userData));

                const token = createToken(userData);
                logger.debug("token", JSON.stringify(token));

                // Send new user info to frontend
                res.json({
                    token: token
                });
                logger.debug("Exit AuthenticationController.handleOAuthTokenExchange");
            })
            .catch(error => {
                logger.error("Failed to create new user", error.message);
            });
            return;
        }

        // During login flow, retrieve user info from DB using the OAuth User ID
        else {
            logger.debug("login flow. Retrieve user");
            dataModel.getApplicationUser(oauthUserId)
            .then(userData => {
                logger.debug("retrieved user", JSON.stringify(userData));
                const token = createToken(userData);
                logger.debug("token", JSON.stringify(token));
                res.json({
                    token: token
                });
                logger.debug("Exit AuthenticationController.handleOAuthTokenExchange");
            })
            .catch(error => {
                logger.error("Failed to authenticate user", error.message);
            });
            return;
        }
    })
    .catch(error => {
        logger.error("OAuth Token Exchange Failed", error.message);

        const errorResponse = {
            code: "FAILED",
            message: error.message
        };

        const response = formatResponse(false, "Operation Failed", null, errorResponse);

        //saveJsonPayload(response, "createNewPerson_output");
        sendResponse(res, 500, response);
        logger.debug("Exit AuthenticationController.handleOAuthTokenExchange");
    })
}




const preRegisterUser = (dataModel) => (req, res, next) => {
    logger.debug("Enter AuthenticationController.preRegisterUser");
    logger.debug(JSON.stringify(req.body));
    const {invite} = req.body;
    logger.debug("invite:", invite);

    // create signup session id
    const signupSessionId = crypto.randomUUID();

    // Persist the signup session ID and invite code in DB.
    dataModel.saveSignupSession(signupSessionId, invite)
    .then(result => {
        logger.debug("Signup session persisted");

        // Return session ID to the frontend
        res.json({ signupSessionId });
    })
    .catch(error => {
        logger.error("Failed to save signup session", error.message);

        const errorResponse = {
            code: "FAILED",
            message: error.message
        };

        const response = formatResponse(false, "Operation Failed", null, errorResponse);

        sendResponse(res, 500, response);
        logger.debug("Exit AuthenticationController.preRegisterUser");
    });
}


export default {
    createNewApplicationUser,
    getApplicationUser,
    handleOAuthTokenExchange,
    preRegisterUser
}