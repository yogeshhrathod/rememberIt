import db from './db';
import { create } from './dbHelper';

// eslint-disable-next-line import/prefer-default-export
export function getFiles() {
  console.log(db);
}

export function addFile() {
  create(db, 'users', {
    username: 'yogesh',
    email: 'yrathod.gmail.com',
  });
}
