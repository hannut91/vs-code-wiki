import * as vscode from 'vscode';

import { createWikiDirectory, createFile } from '../utils/file';
import { getRootFile, getBasePath, getOpenRootFileFolder } from '../config';

export const openWiki = async () => {
  const basePath = getBasePath();
  try {
    await createWikiDirectory(basePath);
  } catch (err) {
    // Do nothing
  }

  const rootFile = getRootFile();

  try {
    await createFile(rootFile);
  } catch (err) {
    vscode.window.showInformationMessage(err);
    return;
  }

  const openRootFileFolder = getOpenRootFileFolder();
  const openRootFileFolderUri = vscode.Uri.file(basePath);
  if (openRootFileFolder) {
    await vscode.commands.executeCommand('vscode.openFolder', openRootFileFolderUri);
  }

  const document = await vscode.workspace.openTextDocument(rootFile);
  await vscode.window.showTextDocument(document, vscode.ViewColumn.Beside);
};
