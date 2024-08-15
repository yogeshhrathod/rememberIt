/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

import { IFileTag } from '../../../schema';
import { find, create, deleteRecord, update } from '../dbHelper';

const TAGS_Table = 'Tags';
export async function getTags() {
  return find(TAGS_Table);
}

export async function addTag(data) {
  return create(TAGS_Table, data);
}

export async function editTag(data: IFileTag) {
  return update(TAGS_Table, 'tag_id', data.tag_id as number, data, {
    fields: ['name', 'icon', 'weight'],
  });
}

export async function removeTag(data) {
  return deleteRecord(TAGS_Table, data);
}
