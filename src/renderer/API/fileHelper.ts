import { FILE_DROPPED } from '../../constants';
import { IFile } from '../../schema';

// eslint-disable-next-line import/prefer-default-export
export async function getFileDropped(droppedFiles: IFile[]) {
  const { err, files }: { count: number; err: any; files: IFile[] } =
    await window.electron.ipcRenderer.invoke(FILE_DROPPED, droppedFiles);
  if (err) return 0;
  return files;
}
