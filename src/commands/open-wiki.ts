import * as vscode from 'vscode';

import { createWikiDirectory, createFile } from '../utils/file';
import { rootFile, basePath, indexFile } from '../config';

export const openWiki = async () => {
  try {
    await createWikiDirectory(basePath);
  } catch (err) {
    // Do nothing
  }

  try {
    await createFile(`${basePath}/${indexFile}`);
  } catch (err) {
    vscode.window.showInformationMessage(err);
  }

  const document = await vscode.workspace.openTextDocument(rootFile);

  await vscode.window.showTextDocument(document, vscode.ViewColumn.Beside);
};
