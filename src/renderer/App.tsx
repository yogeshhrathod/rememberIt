import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IFile } from '../schema';
import FileDropzone from './Components/Dropzone';
import MainPage from './pages/mainPage';
import { fetchFilesRedux } from './redux/filesSlice'; // Import UnknownAction type

function Main() {
  const files = useSelector(
    (state: { files: { value: IFile[] } }) => state.files.value,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFilesRedux() as any); // Cast the action to UnknownAction type
  }, [dispatch]);

  return (
    <div>
      <FileDropzone />
      <MainPage files={files} />
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
