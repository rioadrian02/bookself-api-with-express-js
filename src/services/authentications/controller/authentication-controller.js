import userRepositories from "../../users/repositories/user-repositories.js";
import { InvariantError, AuthenticationError } from "../../../exceptions/index.js";
import authenticationRepositories from "../repositories/authentication-repositories.js";
import tokenManager from "../../../security/token-manager.js";
import response from "../../../utils/response.js";

const login = async(req, res, next) => {
    const { username, password } = req.validated;

    const userId = await userRepositories.verifyUserCredential(username, password);

    if(!userId) {
        return next(new AuthenticationError('Kredensial yang anda berikan salah'));
    }

    const accessToken = tokenManager.generateAccessToken({ id: userId });
    const refreshToken = tokenManager.generateRefreshToken({ id: userId });

    await authenticationRepositories.addRefreshToken(refreshToken);

    return response(res, 201, "Authentication Berhasil ditambahkan", {
        accessToken,
        refreshToken
    });
}

const refreshToken = async (req, res, next) => {
    const {refreshToken} = req.validated;

    const isValidRefreshToken = await authenticationRepositories.verifyRefreshToken(refreshToken);

    if(!isValidRefreshToken) {
        return next(new InvariantError('Refresh Token Tidak Valid'));
    }

    const { id } = tokenManager.verifyRefreshToken(refreshToken);
    const newAccessToken = tokenManager.generateAccessToken({ id });

    return response(res, 200, 'Access Token berhasil diperbarui', { newAccessToken });
}

const logout = async(req, res, next) => {
    const { refreshToken } = req.validated;

    const isValidRefreshToken = await authenticationRepositories.verifyRefreshToken(refreshToken);

    if(!isValidRefreshToken) {
        return next(new InvariantError('Refresh Token tidak valid'));
    }

    await authenticationRepositories.deleteRefreshToken(refreshToken);

    return response(res, 200, 'Refresh Token berhasil dihapus');
}

export { login, refreshToken, logout }