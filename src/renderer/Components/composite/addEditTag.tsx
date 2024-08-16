import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import * as Icons from 'lucide-react'; // Adjust the import path as necessary
import { useDispatch } from 'react-redux';
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
import { addTag, editTag } from '../../API';
import { IFileTag } from '../../../schema';
import { addTagRedux, editTagRedux } from '../../redux/filesSlice';

interface TagInputComponentProps {
  isOpen: boolean;
  closeModal: () => void;
  tag: IFileTag;
}

const TagInputComponent = ({
  isOpen,
  closeModal,
  tag,
}: TagInputComponentProps) => {
  const [tagName, setTagName] = useState(tag.name || '');
  const [tagIcon, setTagIcon] = useState(tag.icon || '');
  const [iconList, setIconList] = useState<
    { value: string; label: ReactElement<any, any> }[]
  >([]);

  const dispatch = useDispatch();

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

  const closeModalWrapper = () => {
    setTagName('');
    setTagIcon('');
    closeModal();
  };

  const addTagHandler = async () => {
    const tagData: IFileTag = {
      name: tagName,
      icon: tagIcon,
      weight: 1,
    };
    const tagId = await addTag(tagData);
    dispatch(addTagRedux({ ...tagData, tag_id: tagId }) as any);
    closeModalWrapper();
  };

  const editTagHandler = async () => {
    const tagData: IFileTag = {
      name: tagName,
      icon: tagIcon,
      tag_id: tag.tag_id as number,
      weight: tag.weight,
    };
    await editTag(tagData);
    dispatch(editTagRedux(tagData) as any);
    closeModalWrapper();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (tagName !== '' && tagIcon !== '') {
      if (tag.tag_id) {
        editTagHandler();
      } else {
        addTagHandler();
      }
    }
  };

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
    <Dialog open={isOpen} onOpenChange={closeModalWrapper}>
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
            <Button> {tag.tag_id ? 'Save Changes' : 'Add Tag'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TagInputComponent;
