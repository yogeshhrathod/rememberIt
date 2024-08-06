/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable import/prefer-default-export */
import { MicVocal, PlusSquare } from 'lucide-react';
import * as Icon from 'lucide-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from '../ui/context-menu';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { IFileTag } from '../../../schema';
import TagInputComponent from './addEditTag';
import { fetchTagsRedux, removeTagRedux } from '../../redux/filesSlice';
import { ScrollArea } from '../ui/scroll-area';
import { removeTag } from '../../API';

// interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
//   playlists: Playlist[];
// }

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  // create tags state
  // const [tags, setTags] = useState<IFileTag[]>([]);
  const tags = useSelector(
    (state: { files: { tags: IFileTag[] } }) => state.files.tags,
  );
  const dispatch = useDispatch();

  const [isOpenTagInputComponent, setIsOpenTagInputComponent] =
    React.useState(false);
  const handleTagInputComponent = () => {
    setIsOpenTagInputComponent(!isOpenTagInputComponent);
  };

  useEffect(() => {
    dispatch(fetchTagsRedux() as any);
  }, [dispatch]);

  const handleDeleteTag = (tag: IFileTag) => {
    removeTag(tag.tag_id as number);
    dispatch(removeTagRedux(tag));
  };
  return (
    <div
      className={cn('pb-12 h-max relative', className)}
      style={{ height: 'calc(100vh - 37px)' }}
    >
      <div className="space-y-4 py-4 max-w[300px]">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Tags
          </h2>
          <ScrollArea>
            <div
              className="space-y-1"
              style={{ height: 'calc(100vh - 155px)' }}
            >
              {tags?.map((tag) => (
                <ContextMenu>
                  <ContextMenuTrigger>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      key={tag.name}
                    >
                      {Icon[tag.icon] ? (
                        React.createElement(Icon[tag.icon], {
                          size: 20,
                          strokeWidth: 1,
                          absoluteStrokeWidth: true,
                          className: 'mr-2',
                        })
                      ) : (
                        <MicVocal
                          size={20}
                          strokeWidth={1}
                          absoluteStrokeWidth
                          className="mr-2"
                        />
                      )}
                      {tag.name}
                    </Button>
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-40">
                    <ContextMenuItem>Edit</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem onClick={() => handleDeleteTag(tag)}>
                      Delete
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className="flex items-center justify-center bottom-0 absolute w-full mb-4">
        <Button onClick={handleTagInputComponent}>
          <PlusSquare /> <span className="px-2">Create Tag</span>
        </Button>
      </div>
      <TagInputComponent
        isOpen={isOpenTagInputComponent}
        tagIconValue=""
        tagNameValue=""
        closeModal={() => setIsOpenTagInputComponent(false)}
      />
    </div>
  );
}
