/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('books', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true
        },
        name: {
            type: 'VARCHAR(100)',
            notNull: true
        },
        year: {
            type: 'BIGINT',
            notNull: true,
        },
        author: {
            type: 'VARCHAR(100)',
            notNull: true
        },
        summary: {
            type: 'TEXT',
            notNull: false,
        },
        publisher: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        page_count: {
            type: 'BIGINT',
            notNull: true,
        },
        read_page: {
            type: 'BIGINT',
            notNull: true,
        },
        reading: {
            type: 'BOOLEAN',
            notNull: true,
        },
        finished: {
            type: 'BOOLEAN',
            notNull: true,
            default: false
        },
        inserted_at: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        updated_at: { 
            type: 'VARCHAR(100)',
            notNull: true
        }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('books');
};
