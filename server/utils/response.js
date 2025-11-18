export function formatResponse(success, message, data, error=null, meta={}) {
    return {
        success: success,
        message: message,
        data: data,
        error: error,
        meta: meta
    };
}

export function sendResponse(res, status, bodyJSON) {
    res.status(status).send(bodyJSON);
}

//export default { formatResponse, sendResponse };