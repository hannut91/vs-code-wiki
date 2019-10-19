import * as vscode from 'vscode';

import { openWiki } from './commands/open-wiki';
import { goToWiki } from './commands/go-to-wiki';
import { searchWiki } from './commands/search-wiki';
import { exportWiki } from './commands/export-wiki';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('wiki.openWiki', openWiki)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('wiki.goToWiki', goToWiki)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('wiki.searchWiki', searchWiki)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('wiki.exportWiki', exportWiki)
  );
}

export function deactivate() { }
