import { workspace } from 'vscode';
import { homedir } from 'os';
import { join } from 'path';

export const indexFile = 'index.md';

const configuration = workspace.getConfiguration('wiki');
export const basePath = configuration.get<string>('basePath')
  || join(homedir(), 'vscode_wiki');

export const rootFile = `${basePath}/${indexFile}`;
export const targetRootFile = configuration.get<string>('targetRootFile');
export const targetPath = configuration.get<string>('targetPath');
