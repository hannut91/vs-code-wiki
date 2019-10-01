import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';

import { rootFile, basePath } from '../config';

export const createWikiDirectory = () => {
  return util.promisify(fs.mkdir)(basePath, { recursive: false });
};

export const createIndexFile = async (): Promise<string> =>
  await createFile('index.md');

export const createFile = async (name: string): Promise<string> => {
  const filePath = path.join(basePath, name);

  try {
    await util.promisify(fs.stat)(filePath);
  } catch (err) {
    await util.promisify(fs.writeFile)(filePath, '');
  }

  return filePath;
};
