import db from "./liveDb.js";
//const { generateOutputPayload, parseInputJson } = require("../utils/transformer.js");
import { generateOutputPayload, parseInputJson } from "../utils/transformer.js";
import logger from "../utils/logger.js";


function createNewApplicationUser(email, username, invite, passwordHash) {
    logger.debug("Enter authenticationModel.createNewApplicationUser");
    const query = "SELECT create_user_from_invite($1,$2, $3, $4) as id";
    const values = [
        email, // email
        username, // username
        passwordHash, // password hash
        invite  // invite code
    ]
    return new Promise((resolve, reject) => {
        db.query(query, values)
        .then(response => {
            if (response != null) {
                console.log(response);
                let data = response.rows[0];
                console.log(data);
                resolve(data);
            }
        })
        .catch((error => {
            logger.error("DB returned an error", error.message);
            reject(error);
        }));
    })
}

function createUserFromInvite(oauthId, inviteCode) {
    logger.debug("Enter authenticationModel.createUserFromInvite");
    const query = "SELECT create_user_from_invite($1,$2) as id";
    const values = [
        oauthId, // Auth0 user id
        inviteCode  // invite code
    ]
    return new Promise((resolve, reject) => {
        db.query(query, values)
        .then(response => {
            if (response != null) {
                console.log(response);
                let data = response.rows[0];
                console.log(data);
                resolve(data);
            }
        })
        .catch((error => {
            logger.error("DB returned an error", error.message);
            reject(error);
        }));
    })
}

function saveSignupSession(sessionId, inviteCode) {
    logger.debug("Enter authenticationModel.saveSignupSession");
    const query = "INSERT INTO a_signup_session VALUES ($1,$2)";
    const values = [
        sessionId, //  session id
        inviteCode  // invite code
    ]
    return new Promise((resolve, reject) => {
        db.query(query, values)
        .then(response => {
            if (response != null) {
                console.log(response);
                let data = response.rows[0];
                console.log(data);
                resolve(data);
            }
        })
        .catch((error => {
            logger.error("DB returned an error", error.message);
            reject(error);
        }));
    })
}

function getInviteFromSession(sessionId) {
    logger.debug("Enter authenticationModel.createUserFromInvite");
    //const query = "SELECT invite_code as data FROM a_signup_session where session_id = $1";
    const query = `SELECT t.role, t.code FROM
                   (SELECT ur.role_name as role, ss.invite_code as code
                   FROM a_signup_session ss,
                        a_invite_code ic,
                        a_user_role ur
                    WHERE ss.invite_code = ic.code
                    AND   ic.user_role = ur.id
                    AND   ss.session_id = $1
                    ) t`;
    const values = [
        sessionId //  session id
    ]
    return new Promise((resolve, reject) => {
        db.query(query, values)
        .then(response => {
            if (response != null) {
                console.log(response);
                let data = response.rows[0];
                console.log(data);
                resolve(data);
            }
        })
        .catch((error => {
            logger.error("DB returned an error", error.message);
            reject(error);
        }));
    })
}



function getApplicationUser(oauthId) {
    logger.debug("Enter authenticationModel.getApplicationUser");
    console.log(oauthId);
    const query = "SELECT get_application_user($1) as data";
    const values = [
        oauthId // email
    ]

    return new Promise((resolve, reject) => {
        db.query(query, values)
        .then(response => {
            if (response != null) {
                console.log("authenticationModel.getApplicationUser received a response from DB");
                //console.log(response);
                let data = response.rows[0];
                //console.log(data.data);
                logger.debug("Exit authenticationModel.getApplicationUser");
                resolve(data.data);
            }
        })
        .catch((error => {
            logger.error("DB returned an error", error.message);
            logger.debug("Exit authenticationModel.getApplicationUser");
            reject(error);
        }));
    })
}



function getApplicationUser1(email, password) {
    logger.debug("Enter authenticationModel.getApplicationUser");
    console.log(email, password);
    const query = "SELECT get_application_user($1) as data";
    const values = [
        email // email
    ]

    return new Promise((resolve, reject) => {
        db.query(query, values)
        .then(response => {
            if (response != null) {
                //console.log(response);
                let data = response.rows[0];
                //console.log(data.data);
                logger.debug("Exit authenticationModel.getApplicationUser");
                resolve(data.data);
            }
        })
        .catch((error => {
            logger.error("DB returned an error", error.message);
            logger.debug("Exit authenticationModel.getApplicationUser");
            reject(error);
        }));
    })
}

export default {
    createNewApplicationUser,
    createUserFromInvite,
    saveSignupSession,
    getInviteFromSession,
    getApplicationUser,
}