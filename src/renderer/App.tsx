import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import { FILE_DROPPED, OPEN_FILE, SELECT_FILE } from 'src/constants';
import { IFile } from 'src/schema';
import FileDropzone from './Components/Dropzon';
import { Button } from './Components/ui/button';

import FileViewTile from './Components/composite/fileCard';
import { getFiles } from './API/helper';

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
      <div>
        {files.map((file: IFile, index) => (
          <FileViewTile
            name={file.file_name}
            path={file.file_path}
            key={index}
            onClick={() => openFile(file)}
          />
        ))}
      </div>
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
