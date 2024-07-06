import { ipcMain, shell } from 'electron';
import { IFile } from 'src/schema';
import { addFile } from '../Database/Models/files';
import { FILE_DROPPED, OPEN_FILE } from '../../constants/index';

export default function initFileOperations() {
  ipcMain.on(OPEN_FILE, async (event, arg) => {
    shell.openPath(arg);
    event.reply(OPEN_FILE, 'Done');
  });

  ipcMain.on(FILE_DROPPED, (event, files: IFile[]) => {
    files.forEach((file: IFile) => {
      addFile(file)
        // eslint-disable-next-line promise/always-return
        .then(() => {
          event.reply(FILE_DROPPED, files);
        })
        .catch((err) => {
          event.reply(FILE_DROPPED, undefined, err);
        });
    });
  });
}
