import { promises } from 'fs';
import { window } from 'vscode';

import { basePath, indexFile } from '../config';

export const deleteWiki = async () => {
  const files = (await promises.readdir(basePath, { withFileTypes: true}))
    .filter(i => i.isFile())
    .map(i => i.name)
    .filter(i => i !== indexFile)
    .filter(i => i.indexOf('.md') >= 0);

    const selectedFile = await window.showQuickPick(files);
    
    if (!selectedFile) {
      return;
    }

    await promises.unlink(`${basePath}/${selectedFile}`);
};
