import { window } from 'vscode';
import { promises } from 'fs';

import {
  targetRootFile, rootFile, basePath, targetPath, indexFile,
} from '../config';
import { copyFile } from '../utils/file';

export const exportWiki = async () => {
  if (!targetPath || !targetRootFile) {
    window.showInformationMessage('The setting does not exist.');
    return;
  }

  const files = (await promises.readdir(basePath, { withFileTypes: true }))
    .filter(i => i.isFile())
    .filter(i => i.name !== indexFile)
    .map(i => i.name);

  await Promise.all(
    files
      .map(i => copyFile(`${basePath}/${i}`, `${targetPath}/${i}`))
  );

  await copyFile(rootFile, targetRootFile);
};
