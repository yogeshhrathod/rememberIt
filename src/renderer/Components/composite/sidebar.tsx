/* eslint-disable import/prefer-default-export */
import {
  BookOpenText,
  BriefcaseBusiness,
  CircleAlert,
  Flame,
  Microscope,
  MicVocal,
  Notebook,
  NotebookText,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import React from 'react';

// interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
//   playlists: Playlist[];
// }

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4 max-w[300px]">
        <div className="px-3 py-2">
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
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Tags
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Flame
                size={20}
                strokeWidth={1}
                absoluteStrokeWidth
                className="mr-2"
              />
              Goa
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <CircleAlert
                size={20}
                strokeWidth={1}
                absoluteStrokeWidth
                className="mr-2"
              />
              Important
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <BookOpenText
                size={20}
                strokeWidth={1}
                absoluteStrokeWidth
                className="mr-2"
              />
              Documents
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Microscope
                size={20}
                strokeWidth={1}
                absoluteStrokeWidth
                className="mr-2"
              />
              New Tech
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <NotebookText
                size={20}
                strokeWidth={1}
                absoluteStrokeWidth
                className="mr-2"
              />
              Tax
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
