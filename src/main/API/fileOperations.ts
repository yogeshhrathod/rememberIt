/* eslint-disable camelcase */
import { ipcMain, shell } from 'electron';
import { deleteFile } from '../Database/Models/files';
import { OPEN_FILE, REMOVE_FILE } from '../../constants/index';
import { IFile } from '../../schema';

export default function initFileOperations() {
  ipcMain.handle(OPEN_FILE, async (event, file: IFile) => {
    shell.openPath(file.file_path);
  });

  ipcMain.handle(REMOVE_FILE, async (_, file_id) => {
    const deletedData = await deleteFile(file_id);
    return deletedData;
  });
}
