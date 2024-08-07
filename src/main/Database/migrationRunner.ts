/* eslint-disable promise/always-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
import * as fs from 'fs/promises'; // For file system operations (optional)
import { Database } from 'better-sqlite3';
import path from 'path';
import log from 'electron-log/main';
import db from './db';
import * as migrationFiles from './migrations';

// Interface for a migration file
interface MigrationFile {
  version: number;
  name: string;
  up(db: Database): Promise<void>;
  down(db: Database): Promise<void>; // Optional for rollback functionality
}

// Migration version tracking table structure
const MIGRATION_TABLE_DDL = `
CREATE TABLE IF NOT EXISTS migrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  version INTEGER NOT NULL UNIQUE, -- Ensure unique version constraint
  applied_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL -- Timestamp of application
);
`;

/**
 * Creates the migration tracking table (migrations) if it doesn't exist.
 *
 * @param db The database connection instance.
 */
async function ensureMigrationTable(): Promise<void> {
  await db.exec(MIGRATION_TABLE_DDL);
}

/**
 * Tracks the versions of migrations that have already been applied.
 */
async function getAppliedVersions(): Promise<number[]> {
  await ensureMigrationTable(); // Create the table if it doesn't exist
  const results = await db.prepare('SELECT version FROM migrations').all();
  return results.map((row: any) => row.version);
}

/**
 * Reads migration files from a directory and parses their version and functions.
 *
 * @param migrationFolder The path to the directory containing migration files.
 * @returns An array of objects representing the migration files.
 */
async function getMigrationFiles(): Promise<MigrationFile[]> {
  const migrationFunction: MigrationFile[] = [];

  for (const file of Object.keys(migrationFiles)) {
    const migration = await migrationFiles[file];
    if (
      !migration.default ||
      !migration.default.version ||
      !migration.default.up ||
      !migration.default.down
    ) {
      log.error(`Invalid migration file: ${file}`);
      throw new Error(`Invalid migration file: ${file}`);
    }

    migrationFunction.push({
      name: file,
      version: migration.default.version,
      up: migration.default.up,
      down: migration.default.down, // Optional for rollback functionality
    });
  }

  return migrationFunction;
}

/**
 * Executes all migration files in a given directory in ascending order of version number,
 * skipping already applied migrations.
 *
 * @param migrationFolder The path to the directory containing migration files.
 * @param db The database connection instance.
 */
async function runMigrations(): Promise<void> {
  const appliedVersions = await getAppliedVersions();
  const migrationVersions = await getMigrationFiles();
  migrationVersions.sort((a, b) => a.version - b.version);

  for (const file of migrationVersions) {
    if (appliedVersions.includes(file.version)) {
      log.info(
        `Skipping migration: ${file.name} (version ${file.version}) - Already applied`,
      );
      continue;
    }

    log.info(`Running migration: ${file.name} (version ${file.version})`);
    await file.up(db);

    // Insert a new record into the migrations table after successful execution
    await db
      .prepare('INSERT INTO migrations (version) VALUES (?)')
      .run(file.version);
  }
}

export default function handleMigrations() {
  runMigrations()
    .then(() => {
      log.info('Migrations applied successfully');
      // Update persistent storage with the tracker's appliedVersions (if applicable)
    })
    .catch((error) => log.error('Error running migrations:', error));
}
