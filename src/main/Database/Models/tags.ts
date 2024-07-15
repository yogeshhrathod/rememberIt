/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

import { find } from '../dbHelper';

const TAGS_Table = 'Tags';
export async function getTags() {
  return find(TAGS_Table);
}
