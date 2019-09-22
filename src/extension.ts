import * as vscode from 'vscode';

import { createWikiDirectory, createIndexFile } from './utils/file';

const cmd = 'extension.openWiki';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vs-code-wiki" is now active!');

  const disposable = vscode.commands.registerCommand(cmd, async () => {
    try {
      await createWikiDirectory();
    } catch (err) {
      // do nothing
    }
    
    try {
      await createIndexFile();
    } catch (err) {
      vscode.window.showInformationMessage(err);
    }

    const document = await vscode.workspace.openTextDocument(
      `${process.env.HOME}/vscode_wiki/index.md`
    );

    await vscode.window.showTextDocument(document, vscode.ViewColumn.Beside);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() { }
