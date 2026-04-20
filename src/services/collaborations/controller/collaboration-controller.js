import { AuthorizationError, InvariantError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import bookRepositories from "../../books/repositories/book-repositories.js";
import collaborationRepositories from "../repositories/collaboration-repositories.js";

const addCollaboration = async (req, res, next) => {
    const { id } = req.user;
    const { bookId, userId } = req.validated;

    const isOwner = await bookRepositories.verifyBookOwner(bookId, id);

    if(!isOwner) {
        return next(new AuthorizationError('Anda tidak berhak mengakses resources ini'));
    }
    
    const collaboration = await collaborationRepositories.addCollaboration(bookId, userId);

    if(!collaboration) {
        return next(new InvariantError('Kolaborasi gagal ditambahkan'));
    }

    return response(res, 201, "Kolaborasi berhasil ditambahkan", {collaborationId: collaboration});
}

const deleteCollaboration = async (req, res, next) => {
    const { id } = req.user;
    const { bookId, userId } = req.validated;

    const isOwner = await bookRepositories.verifyBookOwner(bookId, id);

    if(!isOwner) {
        return next(new AuthorizationError("Anda tidak berhak mengakses resources ini"));
    }

    await collaborationRepositories.deleteCollaboration(bookId, userId);

    return response(res, 200, "Kolaborasi berhasil dihapus", null);
}

export { addCollaboration, deleteCollaboration }