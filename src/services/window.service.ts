import { window } from 'vscode';

export const getActiveEditor = () => window.activeTextEditor;

export const showMessage = (message: string) => {
  window.showInformationMessage(message);
};
