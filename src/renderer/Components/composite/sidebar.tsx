/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable import/prefer-default-export */
import { BriefcaseBusiness, MicVocal, Notebook } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { getTags } from '../../API';
import { IFileTag } from '../../../schema';

// interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
//   playlists: Playlist[];
// }

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  // create tags state
  const [tags, setTags] = useState<IFileTag[]>([]);

  useEffect(() => {
    getTags().then((dbTags: IFileTag[]) => {
      setTags(dbTags);
    });
  }, []);
  return (
    <div
      className={cn('pb-12 h-max', className)}
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
        </div>
      </div>
    </div>
  );
}
