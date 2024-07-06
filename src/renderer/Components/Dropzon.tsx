import React, { useState, useEffect } from 'react';

const { ipcRenderer } = window.electron;
const FileDropzone: React.FC<void> = () => {
  const [isDragging, setIsDragging] = useState(false);
  let dragCounter = 0;

  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter++;
      if (dragCounter === 1) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter--;
      if (dragCounter === 0) {
        setIsDragging(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      dragCounter = 0;
      if (event.dataTransfer) {
        const { files } = event.dataTransfer;
        const filesDetails = [];

        for (let itemIndex = 0; itemIndex < files.length; itemIndex++) {
          const element = files[itemIndex];
          filesDetails.push({ name: element.name, path: element.path });
        }
        ipcRenderer.sendMessage('file-dropped', filesDetails);
      }
      setIsDragging(false);
    };

    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  return (
    isDragging && (
      <div className="dropzon-overlay">
        <p>Drop your files here</p>
      </div>
    )
  );
};

export default FileDropzone;
