import { promises } from 'fs';
import { window } from 'vscode';

import { basePath, indexFile } from '../config';
import { backup } from '../services/backup.service';

export const deleteWiki = async () => {
  const files = (await promises.readdir(basePath, { withFileTypes: true }))
    .filter(i => i.isFile())
    .map(i => i.name)
    .filter(i => i !== indexFile)
    .filter(i => i.indexOf('.md') >= 0);

  const selectedFile = await window.showQuickPick(files);
  if (!selectedFile) {
    return;
  }

  const content = (await promises.readFile(
    `${basePath}/${selectedFile}`)).toString();
  if (!content) {
    await promises.unlink(`${basePath}/${selectedFile}`);
    return;
  }

  const answer = await window.showInputBox({
    placeHolder: 'Please type \'yes\' if you want to delete it.',
    prompt: `Delete ${basePath}/${selectedFile}`,
    validateInput: (value: string) => {
      if (value.toLowerCase() !== 'yes') {
        return 'You can type only \'yes\'.';
      }
    }
  });
  if (!answer) {
    return;
  }
  
  await backup(basePath, selectedFile);
  await promises.unlink(`${basePath}/${selectedFile}`);
  return;
};
