import { promises } from 'fs';
import { join } from 'path';

import { window } from 'vscode';

import {
  getTargetRootFile, getRootFile, getBasePath, getTargetPath, indexFile,
} from '../config';
import { copyFile } from '../utils/file';

export const exportWiki = async () => {
  const targetPath = getTargetPath();
  const targetRootFile = getTargetRootFile();
  if (!targetPath || !targetRootFile) {
    window.showInformationMessage('The setting does not exist.');
    return;
  }

  const basePath = getBasePath();
  const files = (await promises.readdir(basePath, { withFileTypes: true }))
    .filter((i) => i.isFile())
    .filter((i) => i.name !== indexFile)
    .map((i) => i.name);

  await Promise.all(
    files.map((i) => copyFile(join(basePath, i), join(targetPath || '', i))),
  );

  const rootFile = getRootFile();
  await copyFile(rootFile, targetRootFile);
};
