/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { IFile, IFileTag } from '../../../schema';
import db from '../db';
import { deleteRecord, find } from '../dbHelper';

const FILE_TABLE = 'Files';

export async function addFiles(files: IFile[], tags: IFileTag[]) {
  try {
    const trx = db.transaction(() => {
      for (const file of files) {
        const filId = db
          .prepare(
            `INSERT INTO ${FILE_TABLE} (file_name, file_path, size, format) VALUES (?, ?, ?, ?)`,
          )
          .run(
            file.file_name,
            file.file_path,
            file.size,
            file.format,
          ).lastInsertRowid;

        for (const tag of tags) {
          db.prepare(
            `INSERT INTO FileTags (file_id, tag_id, weight) VALUES (?, ?, ?)`,
          ).run(filId, tag.tag_id, tag.weight);
        }
      }
    });
    trx();
    return { count: files.length, error: null };
  } catch (error) {
    return { count: 0, error };
  }
}
export async function getFiles() {
  return find(FILE_TABLE);
}

export async function deleteFile(file_id: number) {
  try {
    const count = await deleteRecord(FILE_TABLE, { file_id });
    return { count, error: null };
  } catch (error) {
    return { count: 0, error };
  }
}
