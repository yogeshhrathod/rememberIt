/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { IFile, IFileTag } from '../../../schema';
import { create, find } from '../dbHelper';

const FILE_TABLE = 'Files';

export async function addFiles(files: IFile[], tags: IFileTag[]) {
  try {
    const fileIds = await Promise.all(
      files.map((file) => create(FILE_TABLE, file)),
    );

    for (const file_id of fileIds) {
      for (const tag of tags) {
        await create('FileTags', { file_id, tag_id: tag.tag_id });
      }
    }

    // await db.commitTransaction();
  } catch (error) {
    console.log(error);

    // await db.rollbackTransaction();
    throw error;
  }
}
export async function getFiles() {
  return find(FILE_TABLE);
}
