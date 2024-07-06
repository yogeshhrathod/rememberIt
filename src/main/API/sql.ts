import { ipcMain } from 'electron';
import { ADD_FILE, SELECT_FILE } from '../../constants/index';
import { addFile, getFiles } from '../Database/Models/files';

export default function initSqlOperations() {
  ipcMain.on(ADD_FILE, async (event, arg) => {
    console.log(`adding file`, arg);
    await addFile(arg);
    event.reply(ADD_FILE);
  });

  ipcMain.on(SELECT_FILE, async (event) => {
    console.log('selecting files');
    const files = await getFiles();
    console.log(files);
    event.reply(SELECT_FILE, files);
  });
}
