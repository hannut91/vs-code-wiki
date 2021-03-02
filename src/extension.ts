import * as vscode from 'vscode';

import {
  openWiki, goToWiki, searchWiki, exportWiki, deleteWiki,
} from './commands';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('wiki.openWiki', openWiki),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('wiki.goToWiki', goToWiki),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('wiki.searchWiki', searchWiki),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('wiki.exportWiki', exportWiki),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('wiki.deleteWiki', deleteWiki),
  );
}
