import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import { ADD_FILE, FILE_DROPPED, SELECT_FILE } from 'src/constants';
import { IFile } from 'src/schema';
import FileDropzone from './Components/Dropzon';
import { Button } from './Components/ui/button';

import FileViewTile from './Components/composite/fileCard';

function Main() {
  const [files, setFiles] = useState<any[]>([]);
  useEffect(() => {
    window.electron.ipcRenderer.sendMessage(SELECT_FILE);
    window.electron.ipcRenderer.on(SELECT_FILE, (args: IFile[]) => {
      console.log(args);

      setFiles(args);
    });

    window.electron.ipcRenderer.on(FILE_DROPPED, (files: IFile[], err: any) => {
      if (err) {
        // TODO: SHOW TOAST
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setFiles((file: IFile[]) => {
        return [...file, ...files];
      });
    });
  }, []);

  const openFile = (file: IFile) => {
    console.log('click...');
    window.electron.ipcRenderer.sendMessage(ADD_FILE, file);
  };

  return (
    <div>
      <FileDropzone />
      <Button>Test</Button>

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
