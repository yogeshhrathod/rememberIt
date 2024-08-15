import { IFile } from '../schema';

// file db operations
export const ADD_FILES = 'add-files';
export const GET_FILES = 'get-files';
export const REMOVE_FILE = 'remove-file';

// tags db operations
export const GET_TAGS = 'get-tags';
export const ADD_TAG = 'add-tag';
export const REMOVE_TAG = 'remove-tag';
export const EDIT_TAG = 'edit-tag';

// file system operations
export const OPEN_FILE = 'open-file';
export const OPEN_DIR = 'open-directory';

export const FILE_DROPPED = 'file-dropped';
export type FILE_DROPPED_PARAMS = {
  files: IFile[];
  error: Error;
  count: number;
};
