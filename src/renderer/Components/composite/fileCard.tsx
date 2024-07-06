import React from 'react';

import { IFile } from 'src/schema';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '../ui/card';
import { Button } from '../ui/button';

interface IFileCard {
  name: string;
  path: string;
  onClick: () => void;
}
function isImage(path: string): boolean {
  // Extract file extension from the filePath
  const extension = path.split('.').pop()?.toLowerCase();

  // List of common image file extensions
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];

  // Check if the extension exists in the imageExtensions array
  return extension ? imageExtensions.includes(extension) : false;
}

const FileViewTile: React.FC<IFileCard> = ({ name, path, onClick }) => {
  return (
    <Card className="w-[250px]">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        {isImage(path) && <img src={path} alt={name} />}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={onClick}>Open</Button>
      </CardFooter>
    </Card>
  );
};
export default FileViewTile;
