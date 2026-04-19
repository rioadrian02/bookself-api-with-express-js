import pkg from 'pg';
const { Pool } = pkg;
import { nanoid } from 'nanoid';


class BookRepositories {
    constructor() {
        this._pool = new Pool();
    }

    async createBook({ name, year, author, summary, publisher, pageCount, readPage, reading }) {
        const id = nanoid(16);
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;
        const finished = readPage === pageCount;

        const query = {
            text: "INSERT INTO books(id, name, year, author, summary, publisher, page_count, read_page, finished, reading, inserted_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id, name, year, author, summary, publisher, page_count, read_page, finished, reading, inserted_at, updated_at",
            values: [id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt]
        }

        const result = await this._pool.query(query);

        return result.rows[0].id;
    }

    async getBooks(name, reading, finished) {
        const query = {
            text: 'SELECT * FROM books'
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
            text: 'SELECT * FROM books WHERE id=$1',
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
}

export default new BookRepositories();