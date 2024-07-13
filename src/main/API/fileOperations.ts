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
    const { count, error } = await addFiles(files, tags);
    event.reply(FILE_DROPPED, { files, count, error });
  });
}
