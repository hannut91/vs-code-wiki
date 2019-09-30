import { TextDocument } from 'vscode';

import { basePath } from '../config';

export const isInWikiDir = (document: TextDocument): boolean => (
  document.fileName.startsWith(basePath) &&
  document.languageId === 'markdown'
);
