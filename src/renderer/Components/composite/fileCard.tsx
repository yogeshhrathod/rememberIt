/* eslint-disable import/prefer-default-export */

import React, { useEffect, useState } from 'react';
import {
  File,
  FileSpreadsheet,
  FileAudio,
  FileText,
  FileAudio2,
  FileArchive,
  FileBarChart,
  FileBarChart2Icon,
  LucideFileBarChart,
  FilePieChart,
  FileAxis3d,
  FileJson2,
  FileCode2,
} from 'lucide-react';
import { TrashIcon } from '@radix-ui/react-icons';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '../ui/context-menu';
import { IFile } from '../../../schema';
import { getFriendlyFileSize } from '../../util';
import { openDir, openFile, removeFiles } from '../../API/helper';
import { removeFileRedux } from '../../redux/filesSlice';

interface IFileViewTile extends React.HTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;
  name: string;
  path: string;
  meta: IFile;
}

function isImagePath(extension: string) {
  const imageExtensions = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'bmp',
    'webp',
    'tiff',
    'svg',
  ];
  const extensionLower = extension.toLowerCase();
  return imageExtensions.includes(extensionLower);
}

function fileFormatIconMapping(format: string) {
  // make it better

  switch (format) {
    case 'pdf':
      return <FileAxis3d size={100} strokeWidth={2} absoluteStrokeWidth />;
    case 'doc':
    case 'docx':
      return <FileText size={100} strokeWidth={2} absoluteStrokeWidth />;
    case 'mp3':
    case 'wav':
    case 'flac':
      return <FileAudio size={100} strokeWidth={2} absoluteStrokeWidth />;
    case 'xls':
    case 'xlsx':
      return <FilePieChart size={100} strokeWidth={2} absoluteStrokeWidth />;
    case 'csv':
      return <FileSpreadsheet size={100} strokeWidth={2} absoluteStrokeWidth />;
    case 'ppt':
    case 'pptx':
      return (
        <LucideFileBarChart size={100} strokeWidth={2} absoluteStrokeWidth />
      );
    case 'txt':
      return <FileText size={100} strokeWidth={2} absoluteStrokeWidth />;
    case 'zip':
    case 'rar':
    case 'tar':
      return <FileArchive size={100} strokeWidth={2} absoluteStrokeWidth />;
    case 'json':
    case 'xml':
      return <FileJson2 size={100} strokeWidth={2} absoluteStrokeWidth />;
    case 'html':
    case 'css':
    case 'js':
      return <FileCode2 size={100} strokeWidth={2} absoluteStrokeWidth />;

    default:
      return <File size={100} strokeWidth={2} absoluteStrokeWidth />;
  }
}

export function FileViewTile({
  width,
  height,
  className,
  name,
  path,
  meta,
  ...props
}: IFileViewTile) {
  const [isImage, setIsImage] = useState(true);
  const dispatch = useDispatch();
  const onRemoveHandler = async () => {
    await removeFiles(meta.file_id as number);
    dispatch(dispatch(removeFileRedux(meta)));
    toast.success('File removed');
  };

  useEffect(() => {
    setIsImage(isImagePath(meta.format));
  }, [meta.format]);

  const openFileHandler = () => {
    openFile(meta);
    toast.success('File opened');
  };

  const openDirHandler = () => {
    openDir(meta);
    toast.success('Opening Folder');
  };

  return (
    <div
      className={cn('cursor-pointer overflow-hidden', className)}
      {...props}
      onDoubleClick={openFileHandler}
    >
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            {isImage ? (
              <img
                src={path}
                alt={name}
                width={width}
                height={height}
                className={cn(
                  'object-cover transition-all hover:scale-105 aspect-square p-2 rounded-2xl',
                )}
              />
            ) : (
              <div className="w-[100px] h-[100px] hover:scale-105 ">
                {fileFormatIconMapping(meta?.format?.toLowerCase())}
              </div>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem onClick={openFileHandler}>Open</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={openDirHandler}>
            Open Folder
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Details</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={onRemoveHandler} className="text-red-500 ">
            <span className="pr-1">
              <TrashIcon />
            </span>
            Remove
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="w-full px-2">
        <h3 className="text-xs font-small font-bold truncate" title={name}>
          {name}
        </h3>
        <span className="flex text-gray-500 justify-between">
          <p className="text-xs inline">{meta?.format?.toUpperCase()}</p>
          <p className="text-xs inline">{getFriendlyFileSize(meta?.size)}</p>
        </span>
      </div>
    </div>
  );
}
