import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import userRepositories from "../repositories/user-repositories.js";

const createUser = async (req, res, next) => {
    const { username, password, fullname } = req.validated;

    const isUsernameExist = await userRepositories.verifyNewUsername(username);

    if(isUsernameExist) {
        return next(new InvariantError('Gagal menambahkan user. Username sudah digunakan'));
    }

    const user = await userRepositories.store(username, password, fullname);

    if(!user) {
        return next(new InvariantError('User gagal ditambahkan'))
    }

    return response(res, 201, "User berhasil ditambahkan", user);
}

const getUserById = async (req, res, next) => {
    const { id } = req.params;

    const user = await userRepositories.findById(id);

    if(!user) {
        return next(new NotFoundError('User tidak ditemukan'));
    }

    return response(res, 200, undefined, { userId: user });
}

export { createUser, getUserById };
