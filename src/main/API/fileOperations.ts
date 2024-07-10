import { ipcMain, shell } from 'electron';
import { addFiles } from '../Database/Models/files';
import { FILE_DROPPED, OPEN_FILE } from '../../constants/index';
import { IFileTag, IFile } from '../../schema';

export default function initFileOperations() {
  ipcMain.on(OPEN_FILE, async (event, arg: IFile) => {
    shell.openPath(arg.file_path);
    event.reply(OPEN_FILE, 'Done');
  });

  ipcMain.on(FILE_DROPPED, async (event, files: IFile[], tags: IFileTag[]) => {
    let results = {};
    const count = await addFiles(files, tags);
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      try {
        // eslint-disable-next-line no-await-in-loop
        results = { count, err: null, files };
      } catch (err) {
        results = { count: 0, err, file };
      }
    }
    event.reply(FILE_DROPPED, results);
  });
}
