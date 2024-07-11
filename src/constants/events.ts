import { IFile } from '../schema';
// DB ACTION
export const ADD_FILE = 'add-file';
export const SELECT_FILE = 'select-files';
export const ADD_TAG = 'add-tag';

// FILE ACTION
export const OPEN_FILE = 'open-file';

export const FILE_DROPPED = 'file-dropped';
export type FILE_DROPPED_PARAMS = {
  files: IFile[];
  error: Error;
  count: number;
};
