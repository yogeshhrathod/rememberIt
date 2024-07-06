import { IFile } from '../../schema';
import { ADD_FILE, SELECT_FILE } from '../../constants';

// eslint-disable-next-line import/prefer-default-export
export async function getFiles() {
  const { files, err }: { files: IFile[]; err: any } =
    await window.electron.ipcRenderer.invoke(SELECT_FILE);
  if (err) return [];
  return files;
}
export async function addFiles(files: IFile[]) {
  const { count, err }: { count: number; err: any } =
    await window.electron.ipcRenderer.invoke(ADD_FILE, files);
  if (err) return 0;
  return count;
}
