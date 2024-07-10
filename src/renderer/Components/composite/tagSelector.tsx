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

// eslint-disable-next-line import/prefer-default-export
export function DialogTagSelector({ onTagAdd = '', onDialoageClose }) {
  return (
    <Dialog defaultOpen onOpenChange={onDialoageClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Tag</DialogTitle>
          <DialogDescription>
            Please select the best suitable tag for this file
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <MultiSelect />
          </div>
        </div>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onTagAdd('name', 'age')}
            >
              Save Changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
