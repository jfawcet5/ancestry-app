function successResponse(res, data={}, message="Success", meta={}) {
    return res.json({
        status: "success",
        message,
        data,
        error: null,
        meta
    });
}

function errorResponse(res, statusCode=500, errorMessage="An error occurred", errorDetails={}) {
    res.status(statusCode).json({
        status: "error",
        message: errorMessage,
        data: null,
        error: errorDetails,
        meta: {}
    })
}

module.exports = { successResponse, errorResponse };