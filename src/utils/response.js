const responseJson = (res, statusCode, message, data) => {
    res.setHeader("Content-Type", "application/json");

    return res.status(statusCode).json({
        code: statusCode,
        status: statusCode < 400 ? "success" : "fail",
        message,
        data
    });

}

export default responseJson;