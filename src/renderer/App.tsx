import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function Hello() {
  return (
    <div>
      <div className="Hello">
        <img
          width="200"
          alt="icon"
          src="C:/Users/yrath/OneDrive/Pictures/R.jfif"
        />
      </div>
      <h1
        onClick={() => {
          console.log(
            window.electron.ipcRenderer.sendMessage(
              'open-file',
              'C:/Users/yrath/OneDrive/Pictures/R.jfif',
            ),
          );
        }}
      >
        Remember It Starter
      </h1>
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
