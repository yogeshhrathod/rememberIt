/* eslint-disable import/prefer-default-export */

import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '../ui/context-menu';

import { File } from 'lucide-react';

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
      className={cn('space-y-3 cursor-pointer', className)}
      {...props}
      onClick={onClick}
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
                  'object-cover transition-all hover:scale-105 aspect-square',
                )}
              />
            ) : (
              <div className="w-[100px] h-[100px]">
                <File size={100} strokeWidth={2} absoluteStrokeWidth />
              </div>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Open</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Open Folder</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Details</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-small font-bold leading-none max-w-[100px] truncate">
          {name}
        </h3>
        <p className="text-xs">JPEJ</p>
      </div>
    </div>
  );
}
