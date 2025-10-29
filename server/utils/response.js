function formatResponse(success, message, data, error=null, meta={}) {
    return {
        success: success,
        message: message,
        data: data,
        error: error,
        meta: meta
    };
}

function sendResponse(res, status, bodyJSON) {
    res.status(status).send(bodyJSON);
}

module.exports = { sendResponse, formatResponse };