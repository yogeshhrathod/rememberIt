/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

import { find, create, deleteRecord } from '../dbHelper';

const TAGS_Table = 'Tags';
export async function getTags() {
  return find(TAGS_Table);
}

export async function addTag(data) {
  return create(TAGS_Table, data);
}

export async function removeTag(data) {
  return deleteRecord(TAGS_Table, data);
}
