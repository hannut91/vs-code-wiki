import { join, dirname, extname } from 'path';

import {
  TextEditorEdit,
  Range,
  window,
  workspace,
  ViewColumn,
  Selection,
  TextDocument,
} from 'vscode';

import { getActiveEditor, showMessage } from '../services/window.service';

import { extractLinkName, containsInLink } from '../utils/word';
import { createFile } from '../utils/file';
import { isInWikiDir } from '../helpers/document';
import { getBasePath } from '../config';

const readCursor = ({ selection, document }: {
  selection: Selection;
  document: TextDocument;
}) => {
  let range: Range;

  if (selection.active.isEqual(selection.anchor)) {
    const r = document.getWordRangeAtPosition(selection.active, /\S+/);
    if (!r) {
      throw new Error('Word not found');
    }

    range = r;
  } else {
    range = selection;
  }

  return {
    range,
    word: document.getText(range),
    fullText: document.lineAt(selection.active.line).text,
  };
};

export const goToWiki = async () => {
  const editor = getActiveEditor();
  if (!editor) {
    showMessage('Current window does not support "Go to Wiki" command. Try it on a regular editing window.');
    return;
  }

  const basePath = getBasePath();
  if (!isInWikiDir(editor.document, basePath)) {
    return;
  }

  const { range, word, fullText } = readCursor(editor);

  const link = containsInLink(
    fullText, range.start.character, range.end.character,
  );
  if (!link) {
    editor.edit((editBuilder: TextEditorEdit) => {
      editBuilder.replace(range, `[${word}](${word.replace(/\s/g, '-')}.md)`);
    });
    return;
  }

  const dir = dirname(editor.document.fileName);
  let name = extractLinkName(link);
  if (!extname(name) && dirname(name) === '.') {
    name += 'index.md';
  }

  let wikiPath: string;

  try {
    wikiPath = await createFile(join(dir, name));
  } catch (err) {
    window.showInformationMessage('Fail to create file: ', err);
    return;
  }

  const document = await workspace.openTextDocument(wikiPath);
  await window.showTextDocument(document, ViewColumn.Active);
};
