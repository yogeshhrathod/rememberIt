import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import FileDropzone from './Components/Dropzon';

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
      <div>
        {files.map((file: any) => (
          <div
            style={{
              padding: '10px',
              cursor: 'pointer',
            }}
            key={file.name}
            onClick={() => openFile(file.path)}
          >
            {file.path}
          </div>
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
