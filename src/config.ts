import { workspace } from 'vscode';
import { homedir } from 'os';
import { join } from 'path';

const configuration = () => workspace.getConfiguration('wiki');

export const indexFile = () => configuration().get<string>('baseRootFile', 'index.md');

export const getBasePath = () => configuration().get<string>('basePath')
  || join(homedir(), 'vscode_wiki');

export const getOpenBasePathAsWorkspace = () => configuration().get<boolean>('openBasePathAsWorkspace', false);

export const getRootFile = () => join(getBasePath(), indexFile());

export const getTargetRootFile = () => configuration().get<string>('targetRootFile');

export const getTargetPath = () => configuration().get<string>('targetPath');
