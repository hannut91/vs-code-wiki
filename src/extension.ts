import * as vscode from 'vscode';

import { openWiki } from './commands/open-wiki';
import { goToWiki } from './commands/go-to-wiki';
import { searchWiki } from './commands/search-wiki';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.openWiki', openWiki)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('extension.goToWiki', goToWiki)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('extension.searchWiki', searchWiki)
  );
}

export function deactivate() { }
