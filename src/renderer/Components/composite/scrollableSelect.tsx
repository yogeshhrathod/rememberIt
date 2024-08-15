import { z } from 'zod';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function ScrollableSelect({
  items = [],
  tagIcon,
  onSelect,
}: {
  items: { value: string; label: React.JSX.Element }[];
  tagIcon: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <Select defaultValue={tagIcon} onValueChange={onSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select Icon for Tag" />
        </SelectTrigger>
        <SelectContent>
          {items?.map((item) => (
            <SelectItem
              className="w-2 inline-grid cursor-pointer"
              key={item?.value}
              value={item?.value}
            >
              {item?.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
