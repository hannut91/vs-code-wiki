const window = {
  showInformationMessage: jest.fn(),
  activeTextEditor: {},
};

const vscode = {
  window,
};

module.exports = vscode;
