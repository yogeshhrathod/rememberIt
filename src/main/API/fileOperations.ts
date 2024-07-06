import { ipcMain, shell } from 'electron';
import { IFile } from 'src/schema';
import { addFile } from '../Database/Models/files';
import { FILE_DROPPED, OPEN_FILE } from '../../constants/index';

export default function initFileOperations() {
  ipcMain.on(OPEN_FILE, async (event, arg: IFile) => {
    shell.openPath(arg.file_path);
    event.reply(OPEN_FILE, 'Done');
  });

  ipcMain.on(FILE_DROPPED, async (event, files: IFile[]) => {
    let results = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const count = await addFile(file);
        results = { count, err: null, files };
      } catch (err) {
        results = { count: 0, err, file };
      }
    }
    event.reply(FILE_DROPPED, results);
  });
}
