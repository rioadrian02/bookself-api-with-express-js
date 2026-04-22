import pkg from 'pg';
const { Pool } = pkg;
import { nanoid } from 'nanoid';
import collaborationRepositories from '../../collaborations/repositories/collaboration-repositories.js';


class BookRepositories {
    constructor() {
        this._pool = new Pool();
        this.collaborationRepositories = collaborationRepositories;
    }

    async createBook({ name, year, author, summary, publisher, pageCount, readPage, reading, owner }) {
        const id = nanoid(16);
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;
        const finished = readPage === pageCount;

        const query = {
            text: "INSERT INTO books(id, name, year, author, summary, publisher, page_count, read_page, finished, reading, inserted_at, updated_at, owner) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id, name, year, author, summary, publisher, page_count, read_page, finished, reading, inserted_at, updated_at, owner",
            values: [id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt, owner]
        }

        const result = await this._pool.query(query);

        return result.rows[0].id;
    }

    async getBooks(name, reading, finished, owner) {
        const query = {
            text: 'SELECT books.* FROM books LEFT JOIN collaborations ON collaborations.book_id = books.id WHERE books.owner = $1 OR collaborations.user_id = $1 GROUP BY books.id',
            values: [owner]
        }

        const data = await this._pool.query(query);

        let result = data.rows;

        if(name) {
            result = result.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()));
        } 
        
        if (reading) {
            result = result.filter((item) => item.reading === (Number(reading) === 1));
        }

        if (finished) {
            result = result.filter((item) => item.finished === (Number(finished) === 1));
        }
        
        return result;
    }

    async getBookById(id) {
        const query = {
            text: 'SELECT books.*, users.username FROM books LEFT JOIN users ON users.id = books.owner WHERE books.id=$1',
            values: [id]
        }

        const result = await this._pool.query(query);
        return result.rows[0];
    }

    async editBook(id, { name, year, author, summary, publisher, pageCount, readPage, reading }) {
        const updatedAt = new Date().toISOString();

        const query = {
            text: 'UPDATE books SET name=$1, year=$2, author=$3, summary=$4, publisher=$5, page_count=$6, read_page=$7, reading=$8, updated_at=$9 WHERE id=$10 RETURNING id',
            values: [name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt, id]
        }

        const result = await this._pool.query(query);

        return result.rows[0];
    }

    async deleteBook(id) {
        const query = {
            text: 'DELETE FROM books WHERE id=$1',
            values: [id]
        }

        await this._pool.query(query);

        return "Buku berhasil dihapus";
    }

    async verifyBookOwner(id, owner) {
        const query = {
            text: 'SELECT * FROM books WHERE id=$1',
            values: [id]
        }

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            return null;
        }

        const book = result.rows[0];

        if(book.owner !== owner ) {
            return null;
        }

        return book;
    }

    async verifyBookAccess(bookId, userId) {
        const isOwnerResult = await this.verifyBookOwner(bookId, userId);

        if(isOwnerResult) {
            return isOwnerResult;
        }

        const result = await this.collaborationRepositories.verifyCollaborator(bookId, userId);

        return result;
    }
}

export default new BookRepositories();