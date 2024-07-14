import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React, { useEffect, useState } from 'react';
import { FILE_DROPPED } from '../constants';
import { IFile } from '../schema';
import FileDropzone from './Components/Dropzone';
import { getFiles, openFile } from './API/helper';
import MainPage from './pages/mainPage';

function Main() {
  const [files, setFiles] = useState<any[]>([]);
  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    getFiles().then((dbFiles) => setFiles(dbFiles));

    window.electron.ipcRenderer.on(FILE_DROPPED, () => {
      console.log('File Dropped');

      getFiles()
        .then((dbFiles) => setFiles(dbFiles))
        .catch(console.error);
    });
  }, []);

  const openFileHandler = (file: IFile) => {
    openFile(file);
  };

  return (
    <div>
      <FileDropzone />
      <MainPage files={files} openFile={openFileHandler} />
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
