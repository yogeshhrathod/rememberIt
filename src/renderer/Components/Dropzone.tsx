import React, { useState, useEffect } from 'react';
import { IFile } from '../../schema';
import './dropbox.css';
import { DialogTagSelector } from './composite/tagSelector';
import { FILE_DROPPED } from '../../constants';

const { ipcRenderer } = window.electron;
const FileDropzone: React.FC<{}> = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isDroped, setIsDroped] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState<IFile[]>([]);
  let dragCounter = 0;

  const onTagAddHandler = (tags, files) => {
    if (droppedFiles.length) {
      ipcRenderer.sendMessage(FILE_DROPPED, droppedFiles);
      setDroppedFiles(files);
    }
  };

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
      setIsDroped(true);
      dragCounter = 0;
      if (event.dataTransfer) {
        const { files } = event.dataTransfer;
        const filesDetails: IFile[] = [];

        for (let itemIndex = 0; itemIndex < files.length; itemIndex++) {
          const element = files[itemIndex];
          filesDetails.push({
            file_name: element.name,
            file_path: element.path,
          });
        }
        setDroppedFiles(filesDetails);
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
    <div>
      {isDragging && (
        <div className="dropzon-overlay">
          <p>Drop your files here</p>
        </div>
      )}
      <div>
        {isDroped && (
          <DialogTagSelector
            onTagAdd={onTagAddHandler}
            onDialoageClose={() => {
              setIsDroped(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default FileDropzone;
