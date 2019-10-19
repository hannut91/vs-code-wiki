import * as vscode from 'vscode';
import { TextEditor, TextEditorEdit, Range } from 'vscode';

import { extractLinkName, containsInLink } from '../utils/word';
import { createFile } from '../utils/file';
import { isInWikiDir } from '../helpers/document';
import { basePath } from '../config';

const readCursor = (editor: TextEditor) => {
  let range: Range;

  if (editor.selection.active.isEqual(editor.selection.anchor)) {
    const r = editor.document.getWordRangeAtPosition(
      editor.selection.active, /\S+/);
    if (!r) {
      throw new Error('Word not found');
    }

    range = r;
  } else {
    range = editor.selection;
  }

  return {
    range,
    word: editor.document.getText(range),
    fullText: editor.document.lineAt(editor.selection.active.line).text
  };
};

export const goToWiki = async () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage('Selectd editor is not exist');
    return;
  }

  if (!isInWikiDir(editor.document)) {
    return;
  }

  const { range, word, fullText } = readCursor(editor);

  const link = containsInLink(
    fullText, range.start.character, range.end.character);
  if (!link) {
    editor.edit((editBuilder: TextEditorEdit) => {
      editBuilder.replace(range, `[${word}](${word.replace(/\s/g, '-')}.md)`);
    });
    return;
  }

  const name = extractLinkName(link);

  let wikiPath: string;

  try {
    wikiPath = await createFile(`${basePath}/${name}`);
  } catch (err) {
    vscode.window.showInformationMessage('Fail to create file: ', err);
    return;
  }

  const document = await vscode.workspace.openTextDocument(wikiPath);
  await vscode.window.showTextDocument(document, vscode.ViewColumn.Active);
};
