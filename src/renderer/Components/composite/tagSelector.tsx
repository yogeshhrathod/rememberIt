import React from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
// import MultiSelect from './selectScrollable';
import { MultiSelect } from './selectScrollable';
import { IFileTag } from '../../../schema';

interface DialogTagSelectorProps {
  onTagAddHandler: (files: any) => void;
  onDialogClose: () => void;
}

// eslint-disable-next-line import/prefer-default-export
export function DialogTagSelector({
  onTagAddHandler,
  onDialogClose,
}: DialogTagSelectorProps) {
  const [selectedTags, setSelectedTags] = React.useState<IFileTag[]>([]);

  return (
    <Dialog defaultOpen onOpenChange={onDialogClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Tag</DialogTitle>
          <DialogDescription>
            Please select the best suitable tag for this file
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <MultiSelect
              tags={[
                { tag_id: 1, name: 'Important', weight: 0 },
                { tag_id: 2, name: 'Urgent', weight: 0 },
              ]}
              onSelect={(newSelectedTags) => setSelectedTags(newSelectedTags)}
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                onTagAddHandler(selectedTags);
              }}
            >
              Save Changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
