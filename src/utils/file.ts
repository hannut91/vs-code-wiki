import * as fs from "fs";
import * as util from 'util';
import * as path from 'path';

const dirPath = path.join(process.env.HOME || '', 'vscode_wiki');

export const createWikiDirectory = () => {    
  return util.promisify(fs.mkdir)(dirPath, { recursive: false });
};

export const createIndexFile = async () => {
  const filePath = path.join(dirPath, 'index.md');

  try {
    await util.promisify(fs.stat)(filePath);
  } catch (err) {
    await util.promisify(fs.writeFile)(filePath, '');
  }
};
