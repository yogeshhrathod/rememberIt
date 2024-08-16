/* eslint-disable camelcase */
import { IFile, IFileTag, ISearchParams } from '../../schema';
import {
  ADD_FILES,
  ADD_TAG,
  EDIT_TAG,
  GET_FILES,
  GET_TAGS,
  OPEN_DIR,
  OPEN_FILE,
  REMOVE_FILE,
  REMOVE_TAG,
} from '../../constants';

// eslint-disable-next-line import/prefer-default-export
export async function getFiles(searchParam: ISearchParams) {
  const { files, err }: { files: IFile[]; err: any } =
    await window.electron.ipcRenderer.invoke(GET_FILES, searchParam);
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

export async function openDir(file: IFile) {
  window.electron.ipcRenderer.invoke(OPEN_DIR, file);
}

export async function getTags() {
  const { tags, err }: { tags: IFileTag[]; err: any } =
    await window.electron.ipcRenderer.invoke(GET_TAGS);
  if (err) return [];
  return tags;
}

export async function addTag(tag: IFileTag) {
  const { tagId, err }: { tagId: number; err: any } =
    await window.electron.ipcRenderer.invoke(ADD_TAG, tag);
  if (err) return 0;
  return tagId;
}

export async function editTag(tag: IFileTag) {
  const { count, err }: { count: number; err: any } =
    await window.electron.ipcRenderer.invoke(EDIT_TAG, tag);
  if (err) return 0;
  return count;
}

export async function removeTag(tag_id: number) {
  const { count, err }: { count: number; err: any } =
    await window.electron.ipcRenderer.invoke(REMOVE_TAG, { tag_id });
  if (err) return 0;
  return count;
}
