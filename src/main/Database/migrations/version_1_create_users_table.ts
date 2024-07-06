import { Database } from 'better-sqlite3';

export default {
  version: 1,
  up: async (db: Database): Promise<void> => {
    // Your SQL statements for creating the table or performing the migration
    await db.exec(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL
      );
    `);
  },
  // Optional down function for rollback functionality (if needed)
  down: async (db: Database): Promise<void> => {
    await db.exec('DROP TABLE users'); // Example drop table statement
  },
};
