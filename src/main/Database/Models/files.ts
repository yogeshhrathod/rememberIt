import { IFile } from '../../../schema';
import { create, find } from '../dbHelper';

const FILE_TABLE = 'Files';
export async function addFile(file: IFile) {
  return create(FILE_TABLE, file);
}
export async function getFiles() {
  return find(FILE_TABLE);
}
