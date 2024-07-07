import { ipcMain } from 'electron';
import { ADD_FILE, SELECT_FILE } from '../../constants/index';
import { addFile, getFiles } from '../Database/Models/files';

export default function initSqlOperations() {
  ipcMain.handle(ADD_FILE, async (_, arg) => {
    try {
      const count = await addFile(arg);
      return { count, err: null };
    } catch (error) {
      return { count: null, err: error };
    }
  });

  ipcMain.handle(SELECT_FILE, async () => {
    try {
      const files = await getFiles();
      return { files, err: null };
    } catch (error) {
      return { files: [], err: error };
    }
  });
}
