import { Database } from 'better-sqlite3';

export default {
  version: 1,
  up: async (db: Database): Promise<void> => {
    // Create Tables
    await db.exec(`
      CREATE TABLE Files (
      file_id INTEGER PRIMARY KEY AUTOINCREMENT,
      file_name TEXT NOT NULL,
      file_path TEXT NOT NULL UNIQUE,
      created DATETIME NOT NULL DEFAULT (datetime('now', 'localtime')),
      last_accessed DATETIME NOT NULL DEFAULT (datetime('now', 'localtime')),
      size INTEGER NOT NULL,
      format TEXT NOT NULL,
      description TEXT,
      notes TEXT,
      extras TEXT
      );
    `);

    await db.exec(`
      CREATE TABLE Tags (
      tag_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      weight INTEGER DEFAULT 1,
      icon TEXT,
      color TEXT,
      created DATETIME NOT NULL DEFAULT (datetime('now', 'localtime'))
      );
    `);

    await db.exec(`
      CREATE TABLE FileTags (
        file_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        weight INTEGER DEFAULT 1,  -- Optional weight for tag importance
        FOREIGN KEY (file_id) REFERENCES Files(file_id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES Tags(tag_id),
        PRIMARY KEY (file_id, tag_id)  -- Composite primary key
      );
    `);

    await db.exec(`
      INSERT INTO Tags (name, icon, weight, color) VALUES ('Personal', 'Briefcase', 1, '#ff6347');
      INSERT INTO Tags (name, icon, weight, color) VALUES ('Work', 'User', 1, '#87CEEB');
    `);

    await db.exec(`
      CREATE VIRTUAL TABLE FilesFTS USING FTS5(file_id, description, notes, extras);
    `);

    // Create Triggers
    await db.exec(`
      CREATE TRIGGER files_ai AFTER INSERT ON Files BEGIN
        INSERT INTO FilesFTS(file_id, description, notes, extras)
        VALUES (new.file_id, new.description, new.notes, new.extras);
      END;
    `);

    await db.exec(`
      CREATE TRIGGER files_ad AFTER DELETE ON Files BEGIN
        DELETE FROM FilesFTS WHERE file_id = old.file_id;
      END;
    `);

    await db.exec(`
      CREATE TRIGGER files_au AFTER UPDATE ON Files BEGIN
        DELETE FROM FilesFTS WHERE file_id = old.file_id;
        INSERT INTO FilesFTS(file_id, description, notes, extras)
        VALUES (new.file_id, new.description, new.notes, new.extras);
      END;
    `);
  },
  // Optional down function for rollback functionality (if needed)
  down: async (db: Database): Promise<void> => {
    // Drop FTS5 Virtual Tables (optional, in reverse order)
    await db.exec('DROP VIRTUAL TABLE FilesFTS');

    // Drop Tables (in reverse order)
    await db.exec('DROP TABLE FileTags');
    await db.exec('DROP TABLE Tags');
    await db.exec('DROP TABLE Files');
  },
};
