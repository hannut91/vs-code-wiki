import { TextDocument } from 'vscode';

import { basePath } from '../config';

export const isInWikiDir = (document: TextDocument): boolean => {
  return document.fileName.toLowerCase()
    .startsWith(basePath.toLowerCase()) &&
    document.languageId === 'markdown'
};
