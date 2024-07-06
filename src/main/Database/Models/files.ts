import { IFile } from '../../../typing';
import { create } from '../dbHelper';

const FILE_TABLE = 'Files';
export async function addFile(file: IFile) {
  return create(FILE_TABLE, file);
}
