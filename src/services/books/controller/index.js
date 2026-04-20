import { ClientError, InvariantError, NotFoundError, AuthorizationError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import BookRepositories from "../repositories/book-repositories.js";

const storeBook = async (req, res, next) => {
    const userId = req.user.id;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.validated;

    if(!name) {
        return next(new ClientError("Gagal menambahkan buku. Mohon isi nama buku"));
    }

    if(readPage > pageCount) {
        return next(new ClientError("Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"));
    }

    const newBook = {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        owner: userId
    }

   const book = await BookRepositories.createBook(newBook);

    if(!book) {
        return next(new InvariantError("Buku gagal ditambahkan"));
    }

    return response(res, 201, "Buku berhasil ditambahkan", { bookId: book });
}

const getBooks = async (req, res) => {
    const userId = req.user.id;
    const { name, reading, finished } = req.validated;

    const books = await BookRepositories.getBooks(name, reading, finished, userId);

    return response(res, 200, "Buku sukes ditampilkan", books);
}

const findById = async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;

    const haveAccess = await BookRepositories.verifyBookAccess(id, userId);

    if(!haveAccess) {
        return next(new AuthorizationError("Anda tidak berhak mengakses resource ini"));
    }

    const book = await BookRepositories.getBookById(id);

    if(!book) {
        return next(new NotFoundError("Buku tidak ditemukan"));
    }  
    return response(res, 200, "Buku berhasil ditemukan", book);
}

const update = async (req, res, next) => {
    const userId = req.user.id;
    const { id } = req.params;
    const {  name, year, author, summary, publisher, pageCount, readPage } = req.validated;

    const reading = pageCount === readPage;

    if(!name) {
        return next(new ClientError("Gagal memperbarui buku. Mohon isi nama buku"));
    }

    if(readPage > pageCount) {
        return next(new ClientError("Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"));
    }

    const haveAccess = await BookRepositories.verifyBookAccess(id, userId);

    if(!haveAccess) {
        return next(new AuthorizationError("Anda tidak berhak mengakses resource ini"));
    }

    const book = await BookRepositories.editBook(id, {  name, year, author, summary, publisher, pageCount, readPage, reading });

    if(!book) {
        return next(new NotFoundError("Gagal memperbarui buku. Id tidak ditemukan"));
    }
    return response(res, 200, "Buku berhasil diperbarui", book);
}

const destroy = async (req, res, next) => {
    const userId = req.user.id;
    const { id } = req.params;

    const haveAccess = await BookRepositories.verifyBookAccess(id, userId);
    
    if(!haveAccess) {
        return next(new AuthorizationError("Anda tidak berhak mengakses resource ini"));
    }

    const message = await BookRepositories.deleteBook(id);

    if(!message) {
        return next(new NotFoundError("Buku gagal dihapus. Id tidak ditemukan"));
    }

    return response(res, 200, message, undefined);

}   

export { storeBook, getBooks, findById, update, destroy }