/* eslint-disable import/prefer-default-export */

import React, { useEffect, useState } from 'react';
import { File } from 'lucide-react';
import { cn } from '../../lib/utils';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '../ui/context-menu';

interface IFileViewTile extends React.HTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;
  name: string;
  path: string;
}

function isImagePath(path: string) {
  const imageExtensions = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'bmp',
    'webp',
    'tiff',
    'svg',
    // 'jfif',
  ];
  const extension = path.split('.').pop().toLowerCase();
  return imageExtensions.includes(extension);
}

export function FileViewTile({
  width,
  height,
  className,
  name,
  path,
  onClick,
  ...props
}: IFileViewTile) {
  const [isImage, setIsImage] = useState(true);
  useEffect(() => {
    setIsImage(isImagePath(path));
  }, [path]);
  return (
    <div
      className={cn('cursor-pointer', className)}
      {...props}
      onDoubleClick={onClick}
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
                <File size={100} strokeWidth={2} absoluteStrokeWidth />
              </div>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem onClick={onClick}>Open</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Open Folder</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Details</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="px-2 w-full">
        <h3
          className="text-xs font-small font-bold leading-none max-w-[90px] truncate text-left"
          title={name}
        >
          {name}
        </h3>
        <p className="text-xs">JPEJ</p>
      </div>
    </div>
  );
}
