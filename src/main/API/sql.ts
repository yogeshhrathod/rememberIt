import { ipcMain } from 'electron';
import { ADD_FILES, ADD_TAG, GET_FILES, GET_TAGS } from '../../constants/index';
import { addFiles, getFiles } from '../Database/Models/files';
import { IFile, IFileTag } from '../../schema';
import { addTag, getTags } from '../Database/Models/tags';

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

  ipcMain.handle(GET_TAGS, async () => {
    try {
      const tags = await getTags();
      return { tags, err: null };
    } catch (error) {
      return { files: [], err: error };
    }
  });

  ipcMain.handle(ADD_TAG, async (_, tagData: IFileTag) => {
    try {
      const tags = await addTag(tagData);
      return { tags, err: null };
    } catch (error) {
      return { files: [], err: error };
    }
  });
}
