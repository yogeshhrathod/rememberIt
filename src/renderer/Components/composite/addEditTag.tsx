import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import * as Icons from 'lucide-react'; // Adjust the import path as necessary
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'; // Adjust the import path as necessary
import { Input } from '../ui/input'; // Adjust the import path as necessary
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { ScrollableSelect } from './scrollableSelect';
import { addTag } from '../../API';
import { IFileTag } from '../../../schema';

const TagInputComponent = ({
  isOpen,
  closeModal,
  tagNameValue,
  tagIconValue,
}) => {
  // create two states for the tag name and icon
  const [tagName, setTagName] = useState(tagNameValue);
  const [tagIcon, setTagIcon] = useState(tagIconValue);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (tagName !== '' && tagIcon !== '') {
      // add tag into the database
      const tagData: IFileTag = {
        name: tagName,
        icon: tagIcon,
        weight: 1,
      };
      await addTag(tagData);
      closeModal();
    }
  };

  const [iconList, setIconList] = useState<
    { value: string; label: ReactElement<any, any> }[]
  >([]);

  useEffect(() => {
    const fetchIcons = async () => {
      const filteredIcons = Object.keys(Icons)
        .filter((icon, index) => index % 20 === 0)
        .map((icon) => {
          const IconComponent = Icons[icon];
          return {
            value: icon,
            label: (
              <React.Suspense fallback={<div>Loading...</div>}>
                <IconComponent />
              </React.Suspense>
            ),
          };
        });
      setIconList(filteredIcons);
    };

    fetchIcons();
  }, []);

  const ScrollableSelectMemo = useMemo(() => {
    return (
      <ScrollableSelect
        items={iconList}
        tagIcon={tagIcon}
        onSelect={(val) => {
          setTagIcon(val);
        }}
      />
    );
  }, [iconList, tagIcon]);

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add/Edit Tag</DialogTitle>
        </DialogHeader>
        <DialogDescription>Fill in the details for your tag.</DialogDescription>
        <form onSubmit={handleSubmit}>
          <Label>Tag Name:</Label>
          <Input
            type="text"
            name="tagName"
            value={tagName}
            onChange={(event) => setTagName(event.target.value)}
          />
          <br />
          <div className="flex gap-4">
            <span style={{ flexGrow: 1 }}>
              <Label>Icon:</Label>
              {/* For rerendering on each keystrok */}
              {ScrollableSelectMemo}
            </span>
          </div>
          <br />
          <DialogFooter>
            <Button>Save Tag</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TagInputComponent;
