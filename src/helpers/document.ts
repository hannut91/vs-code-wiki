import { TextDocument } from 'vscode';

import { getBasePath } from '../config';

export const isInWikiDir = (document: TextDocument): boolean => {
  const basePath = getBasePath();
  return document.fileName.toLowerCase().startsWith(basePath.toLowerCase())
    && document.languageId === 'markdown';
};
