/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable import/prefer-default-export */
import { MicVocal, PlusSquare } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from '../ui/context-menu';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { getTags } from '../../API';
import { IFileTag } from '../../../schema';
import TagInputComponent from './addEditTag';

// interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
//   playlists: Playlist[];
// }

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  // create tags state
  const [tags, setTags] = useState<IFileTag[]>([]);

  const [isOpenTagInputComponent, setIsOpenTagInputComponent] =
    React.useState(false);
  const handleTagInputComponent = () => {
    setIsOpenTagInputComponent(!isOpenTagInputComponent);
  };

  useEffect(() => {
    getTags().then((dbTags: IFileTag[]) => {
      setTags(dbTags);
    });
  }, []);
  return (
    <div
      className={cn('pb-12 h-max relative', className)}
      style={{ height: 'calc(100vh - 37px)' }}
    >
      <div className="space-y-4 py-4 max-w[300px]">
        {/* currently no categories */}
        {/* <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Categories
          </h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <BriefcaseBusiness
                size={20}
                strokeWidth={1}
                absoluteStrokeWidth
                className="mr-2"
              />
              Work
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Notebook
                size={20}
                strokeWidth={1}
                absoluteStrokeWidth
                className="mr-2"
              />
              Personal
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <MicVocal
                size={20}
                strokeWidth={1}
                absoluteStrokeWidth
                className="mr-2"
              />
              Hobby
            </Button>
          </div>
        </div> */}
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Tags
          </h2>
          <ContextMenu>
            <ContextMenuTrigger>
              <div className="space-y-1">
                {tags?.map((tag) => (
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    key={tag.name}
                  >
                    {/* icon should use from tag.icon */}
                    <MicVocal
                      size={20}
                      strokeWidth={1}
                      absoluteStrokeWidth
                      className="mr-2"
                    />
                    {tag.name}
                  </Button>
                ))}
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-40">
              <ContextMenuItem>Edit</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      </div>
      <div className="flex items-center justify-center bottom-0 absolute w-full mb-4">
        <Button onClick={handleTagInputComponent}>
          <PlusSquare /> <span className="px-2">Create Tag</span>
        </Button>
      </div>
      <TagInputComponent
        isOpen={isOpenTagInputComponent}
        closeModal={() => setIsOpenTagInputComponent(false)}
      />
    </div>
  );
}
