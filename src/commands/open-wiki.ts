import * as vscode from 'vscode';

import { createWikiDirectory, createIndexFile } from '../utils/file';
import { rootFile } from '../config';

export const openWiki = async () => {
  try {
    await createWikiDirectory();
  } catch (err) {
    // Do nothing
  }

  try {
    await createIndexFile();
  } catch (err) {
    vscode.window.showInformationMessage(err);
  }

  const document = await vscode.workspace.openTextDocument(rootFile);

  await vscode.window.showTextDocument(document, vscode.ViewColumn.Beside);
};
