import { Pool } from "pg";
import CacheService from "../../../cache/CacheService";

class CollaborationRepositories {
    constructor() {
        this._pool = new Pool();
        this._cacheServices = new CacheService();
    }

    async addCollaboration(bookId, userId) {
        const query = {
            text: 'INSERT INTO collaborations(book_id, user_id) VALUES($1, $2) RETURNING id',
            values: [bookId, userId]
        }

        const result  = await this._pool.query(query);

        await this._cacheServices.delete(`books:${userId}`);

        return result.rows[0].id;
    }

    async deleteCollaboration(bookId, userId) {
        const query = {
            text: 'DELETE FROM collaborations WHERE book_id=$1 AND user_id=$2 RETURNING id',
            values: [bookId, userId]
        }

        const result = await this._pool.query(query);

        await this._cacheServices.delete(`books:${userId}`);

        return result.rows[0];
    }

    async verifyCollaborator(bookId, userId) {
        const query = {
            text: 'SELECT * FROM collaborations WHERE book_id = $1 AND user_id = $2',
            values: [bookId, userId],
        };
        
        const result = await this._pool.query(query);
        return result.rows.length > 0;
    }
}

export default new CollaborationRepositories();