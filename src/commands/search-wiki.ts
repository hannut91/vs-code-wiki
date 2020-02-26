import { join } from 'path';

import {
  window, workspace, QuickPickItem, Position, ViewColumn, Selection
} from 'vscode';

import { getBasePath } from '../config';
import { findText } from '../utils/ag';
import { isInWikiDir } from '../helpers/document';

export const searchWiki = async () => {
  const basePath = getBasePath();
  const quickPick = window.createQuickPick<QuickPickItem>();

  quickPick.onDidChangeValue(async (value: any) => {
    if (!value) {
      return;
    }

    try {
      const texts = await findText(basePath, value);

      quickPick.items = texts.map(i => ({ label: i }));
    } catch (err) {
      if (err.code === 1) {
        // Do nothing. If nothing is found, a command fail error occurs.
        return;
      }

      window.showInformationMessage(err.message);
    }
  });

  quickPick.onDidChangeSelection(async (items: QuickPickItem[]) => {
    const item = items[0];
    const results = item.label.split(':');
    const fileName = results[0];
    const line = parseInt(results[1], 10);
    const position = new Position(line - 1, 0);

    const document = await workspace.openTextDocument(join(basePath, fileName));

    let viewColumn = ViewColumn.Beside;
    const activeDitor = window.activeTextEditor;
    if (activeDitor && isInWikiDir(activeDitor.document)) {
      viewColumn = ViewColumn.Active;
    }
    const editor = await window.showTextDocument(document, viewColumn);
    editor.selection = new Selection(position, position);

    quickPick.hide();
  });

  quickPick.show();
};
