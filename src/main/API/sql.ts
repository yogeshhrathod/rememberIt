import { ipcMain } from 'electron';
import { ADD_FILES, GET_FILES } from '../../constants/index';
import { addFiles, getFiles } from '../Database/Models/files';
import { IFile, IFileTag } from '../../schema';

export default function initSqlOperations() {
  ipcMain.handle(ADD_FILES, async (_, files: IFile[], tags: IFileTag[]) => {
    try {
      const count = await addFiles(files, tags);
      return { count, err: null };
    } catch (error) {
      return { count: null, err: error };
    }
  });

  ipcMain.handle(GET_FILES, async () => {
    try {
      const files = await getFiles();
      return { files, err: null };
    } catch (error) {
      return { files: [], err: error };
    }
  });
}
