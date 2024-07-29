import * as React from 'react';
import { X } from 'lucide-react';

import { Command as CommandPrimitive } from 'cmdk';
import { Badge } from '../ui/badge';
import { Command, CommandGroup, CommandItem, CommandList } from '../ui/command';
import { IFileTag } from '../../../schema';

export function MultiSelect({
  onSelect,
  tags,
}: {
  onSelect: (selected: IFileTag[]) => void;
  tags: IFileTag[];
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<IFileTag[]>([]);
  const [inputValue, setInputValue] = React.useState('');

  const handleUnselect = React.useCallback((tag: IFileTag) => {
    setSelected((prev) => prev.filter((s) => s.tag_id !== tag.tag_id));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    [],
  );

  const selectables = tags.filter(
    (tag) => !selected.some((s) => s.tag_id === tag.tag_id),
  );

  const handleSelect = React.useCallback(
    (fileTag: IFileTag) => {
      setInputValue('');
      setSelected((prev) => [...prev, fileTag]);
      onSelect([...selected, fileTag]);
    },
    [onSelect, selected],
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((tag) => {
            return (
              <Badge key={tag.tag_id} variant="secondary">
                {tag.name}
                <button
                  type="button"
                  aria-label="remove"
                  className="ml-1 rounded-full outline-none ring-offset-background "
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(tag);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(tag)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground hover:text-red-500" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select file tags..."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((tag) => {
                  return (
                    <CommandItem
                      key={tag.tag_id}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => handleSelect(tag)}
                      className="cursor-pointer"
                    >
                      {tag.name}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
