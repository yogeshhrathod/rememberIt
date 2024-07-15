/* eslint-disable camelcase */
import { IFile, IFileTag } from '../../schema';
import {
  ADD_FILES,
  GET_FILES,
  GET_TAGS,
  OPEN_FILE,
  REMOVE_FILE,
} from '../../constants';

// eslint-disable-next-line import/prefer-default-export
export async function getFiles() {
  const { files, err }: { files: IFile[]; err: any } =
    await window.electron.ipcRenderer.invoke(GET_FILES);
  if (err) return [];
  return files;
}
export async function addFiles(files: IFile[], tags: IFileTag[]) {
  const { count, err }: { count: number; err: any } =
    await window.electron.ipcRenderer.invoke(ADD_FILES, files, tags);
  if (err) return 0;
  return count;
}
export async function removeFiles(file_id: number) {
  const { count, err }: { count: number; err: any } =
    await window.electron.ipcRenderer.invoke(REMOVE_FILE, file_id);
  if (err) return 0;
  return count;
}

export async function openFile(file: IFile) {
  window.electron.ipcRenderer.invoke(OPEN_FILE, file);
}

export async function getTags() {
  const { tags, err }: { tags: IFileTag[]; err: any } =
    await window.electron.ipcRenderer.invoke(GET_TAGS);
  if (err) return [];
  return tags;
}
