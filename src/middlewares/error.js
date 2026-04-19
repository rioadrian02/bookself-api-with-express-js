import { ClientError } from "../exceptions/index.js";
import response from "../utils/response.js";

const ErrorHandler = (err, req, res, next) => {
    if(err instanceof ClientError) {
        return response(res, err.statusCode, err.message, undefined);
    }

    if(err.isJoi) {
        return response(res, 400, err.details[0].message, undefined);
    }

    const status = err.statusCode || err.status || 500;
    const message = err.message || "Internal Server Error";

    console.error('Unhandled Error: ', err);
    return response(res, status, message, undefined);
}

export default ErrorHandler;