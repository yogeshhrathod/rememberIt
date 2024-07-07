import React from 'react';
import { ScrollArea, ScrollBar } from '../Components/ui/scroll-area';
import { Separator } from '../Components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../Components/ui/tabs';

import { FileViewTile } from '../Components/composite/fileCard';
import { Menu } from '../Components/composite/menu';
import { Sidebar } from '../Components/composite/sidebar';
import { IFile } from '../../schema';

export default function MainPage({
  files,
  openFile,
}: {
  files: IFile[];
  openFile: (path: IFile) => void;
}) {
  return (
    <div>
      <Menu />
      <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <Sidebar className="hidden lg:block" />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">
                <Tabs defaultValue="recents" className="h-full space-y-1">
                  <div className="space-between flex items-center">
                    <TabsList>
                      <TabsTrigger value="recents" className="relative">
                        Recents
                      </TabsTrigger>
                      <TabsTrigger value="files">Files</TabsTrigger>
                      <TabsTrigger value="url" disabled>
                        URL
                      </TabsTrigger>
                      <TabsTrigger value="cmd" disabled>
                        Commands
                      </TabsTrigger>
                      <TabsTrigger value="text" disabled>
                        Text
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent
                    value="recents"
                    className="border-none p-0 outline-none"
                  >
                    <Separator className="mb-2" />
                    <div className="relative">
                      <ScrollArea>
                        <div
                          className="flex space-x-4 pb-4 flex-wrap"
                          style={{ height: 'calc(100vh - 200px)' }}
                        >
                          {files.map((file, index) => {
                            return (
                              <FileViewTile
                                className="w-[100px]"
                                name={file.file_name}
                                onClick={() => openFile(file)}
                                path={file.file_path}
                                width={100}
                                height={100}
                                key={index}
                              />
                            );
                          })}
                        </div>
                        <ScrollBar orientation="vertical" />
                      </ScrollArea>
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="files"
                    className="h-full flex-col border-none p-0 data-[state=active]:flex"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          No Files
                        </h2>
                      </div>
                    </div>
                    <Separator className="my-4" />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
