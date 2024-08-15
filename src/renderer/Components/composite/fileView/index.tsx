import React from 'react';
import { IFile } from '../../../../schema';
import { FileViewTile } from '../fileCard';

const FileView: React.FC<{ files: IFile[] }> = ({ files }) => {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {files.length > 0 ? (
        files.map((file, index) => {
          return (
            <FileViewTile
              className="flex flex-col items-center w-[100px]"
              name={file.file_name}
              path={file.file_path}
              width={100}
              height={100}
              meta={file}
              key={index}
            />
          );
        })
      ) : (
        <div
          className="flex items-center justify-center text-gray-500 w-full"
          style={{ height: 'calc(100vh - 200px)' }}
        >
          <div className="space-y-1 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">No Files</h2>
            <p className="text-sm text-gray-400">Drag files to remember it!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default FileView;
