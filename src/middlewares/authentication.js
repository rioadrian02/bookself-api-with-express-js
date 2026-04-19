import tokenManager from "../security/token-manager";
import response from "../utils/response";

const authenticateToken = (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) {
        return response(res, 401, 'Unauthorized', null);
    }

    try {
        const token = authorization.split('Bearer ')[1];
        const user = tokenManager.verify(token);
        req.user = user;
        return next();
    } catch(error) {
        return response(res, 401, error.message, null);
    }
}

export default authenticateToken;