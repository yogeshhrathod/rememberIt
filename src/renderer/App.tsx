import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import {
  FILE_DROPPED,
  FILE_DROPPED_PARAMS,
  OPEN_FILE,
  SELECT_FILE,
} from '../constants';
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
      ({ files: droppedFiles, error, count }: FILE_DROPPED_PARAMS) => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        if (error) {
          // TODO: ADD toast
          console.error('Error:', error);
          return;
        }
        setFiles((file: IFile[]) => {
          return [...file, ...droppedFiles];
        });
        // TOAST of added file
        console.log('Added:', count);
      },
    );
  }, []);

  const openFile = (file: IFile) => {
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
