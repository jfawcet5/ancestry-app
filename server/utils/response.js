function successResponse(res, data={}, message="Success", meta={}) {
    return res.json({
        success: true,
        message,
        data,
        error: null,
        meta
    });
}

function errorResponse(res, statusCode=500, errorMessage="An error occurred", errorDetails={}) {
    res.status(statusCode).json({
        success: false,
        message: errorMessage,
        data: null,
        error: errorDetails,
        meta: {}
    })
}

module.exports = { successResponse, errorResponse };