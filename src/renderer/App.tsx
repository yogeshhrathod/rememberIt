import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import { FILE_DROPPED, OPEN_FILE, SELECT_FILE } from '../constants';
import { IFile } from '../schema';
import FileDropzone from './Components/Dropzone';
import { getFiles } from './API/helper';
import MainPage from './pages/mainPage';
import React from 'react';

function Main() {
  const [files, setFiles] = useState<any[]>([]);
  useEffect(() => {
    window.electron.ipcRenderer.sendMessage(SELECT_FILE);

    // eslint-disable-next-line promise/catch-or-return
    getFiles().then((dbFiles) => setFiles(dbFiles));

    window.electron.ipcRenderer.on(
      FILE_DROPPED,
      ({
        err,
        files: droppedFiles,
      }: {
        count: number;
        err: any;
        files: IFile[];
      }) => {
        if (err) {
          // TODO: SHOW TOAST
          console.error(err);

          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-shadow
        setFiles((file: IFile[]) => {
          return [...file, ...droppedFiles];
        });
      },
    );
  }, []);

  const openFile = (file: IFile) => {
    console.log('click...');
    window.electron.ipcRenderer.sendMessage(OPEN_FILE, file);
  };

  return (
    <div>
      <FileDropzone />
      <MainPage files={files} openFile={openFile} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
