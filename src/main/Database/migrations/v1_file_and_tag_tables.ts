import { Database } from 'better-sqlite3';

export default {
  version: 1,
  up: async (db: Database): Promise<void> => {
    // Create Tables
    await db.exec(`
      CREATE TABLE Files (
        file_id INTEGER PRIMARY KEY AUTOINCREMENT,
        file_name TEXT NOT NULL,
        file_path TEXT NOT NULL UNIQUE  -- Enforce unique file paths
      );
    `);

    await db.exec(`
      CREATE TABLE Tags (
        tag_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        weight INTEGER DEFAULT 1
      );
    `);

    await db.exec(`
      CREATE TABLE FileTags (
        file_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        weight INTEGER DEFAULT 1,  -- Optional weight for tag importance
        FOREIGN KEY (file_id) REFERENCES Files(file_id),
        FOREIGN KEY (tag_id) REFERENCES Tags(tag_id),
        PRIMARY KEY (file_id, tag_id)  -- Composite primary key
      );
    `);

    await db.exec(`
      INSERT INTO Tags (name) VALUES ('Important'), ('Urgent');
    `);

    await db.exec(`
      CREATE VIRTUAL TABLE FilesFTS_Path USING FTS5(file_path);
    `);

    await db.exec(`
      CREATE VIRTUAL TABLE FilesFTS USING FTS5(name);
    `);
  },
  // Optional down function for rollback functionality (if needed)
  down: async (db: Database): Promise<void> => {
    // Drop FTS5 Virtual Tables (optional, in reverse order)
    await db.exec('DROP VIRTUAL TABLE FilesFTS');
    await db.exec('DROP VIRTUAL TABLE FilesFTS_Path');
    await db.exec('DROP VIRTUAL TABLE FilesFTS_Name');

    // Drop Tables (in reverse order)
    await db.exec('DROP TABLE FileTags');
    await db.exec('DROP TABLE Tags');
    await db.exec('DROP TABLE Files');
  },
};
