import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import FileDropzone from './Components/Dropzon';
import { Button } from './Components/ui/button';

import FileViewTile from './Components/composite/fileCard';

function Hello() {
  const [files, setFiles] = useState<any[]>([]);
  useEffect(() => {
    window.electron.ipcRenderer.on('file-dropped', (arg) => {
      setFiles((file: any[]) => {
        return [...file, ...arg];
      });
    });
  }, []);

  const openFile = (filePath: string) => {
    console.log('click...');
    window.electron.ipcRenderer.sendMessage('open-file', filePath);
  };

  return (
    <div>
      <FileDropzone />
      <Button>Test</Button>

      <div>
        {files.map((file: any, index) => (
          <FileViewTile
            name={file.name}
            path={file.path}
            key={index}
            onClick={() => openFile(file.path)}
          />
          // <div
          //   className="cursor-pointer font-bold underline"
          //   key={file.name}
          //   onClick={() => openFile(file.path)}
          // >
          //   {file.path}
          // </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
