import React from 'react';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { ScrollArea, ScrollBar } from '../Components/ui/scroll-area';
import { Separator } from '../Components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../Components/ui/tabs';

import { Menu } from '../Components/composite/menu';
import { Sidebar } from '../Components/composite/sidebar';
import { IFile } from '../../schema';
import FileView from '../Components/composite/fileView';
import { Input } from '../Components/ui/input';
import { fetchFilesRedux } from '../redux/filesSlice';

export default function MainPage({ files }: { files: IFile[] }) {
  const dispatch = useDispatch();
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(fetchFilesRedux({ search: event.target.value }) as any);
  }

  return (
    <div>
      <Menu />
      <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <Sidebar className="hidden lg:block" />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">
                <Tabs defaultValue="files" className="h-full space-y-1">
                  <span className="flex justify-between">
                    <div className="space-between inline-flex items-center">
                      <TabsList>
                        <TabsTrigger
                          value="recents"
                          disabled
                          className="relative"
                        >
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

                    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 inline-block">
                      <form>
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search"
                            className="pl-8"
                            onChange={(event) => handleSearch(event)}
                          />
                        </div>
                      </form>
                    </div>
                  </span>

                  <TabsContent
                    value="files"
                    className="border-none p-0 outline-none"
                  >
                    <Separator className="mb-2" />
                    <div className="relative">
                      <ScrollArea>
                        <div
                          className="flex flex-wrap pb-4 "
                          style={{ maxHeight: 'calc(100vh - 200px)' }}
                        >
                          <FileView files={files} />
                        </div>
                        <ScrollBar orientation="vertical" />
                      </ScrollArea>
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="rencents"
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
