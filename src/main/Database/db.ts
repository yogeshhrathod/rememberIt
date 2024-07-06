import Database from 'better-sqlite3';
import { app } from 'electron';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

const userDataPath = app.getPath('userData');
const dbPath = path.join(userDataPath, 'db');

if (!existsSync(dbPath)) {
  mkdirSync(dbPath);
}

const db = new Database(path.join(dbPath, 'remember.db'), {
  verbose: console.log,
});

export default db;
