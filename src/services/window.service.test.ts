import { window } from 'vscode';

import { getActiveEditor, showMessage } from './window.service';

describe('WindowService', () => {
  describe('getActiveEditor', () => {
    describe('when editor exist', () => {
      it('returns editor', async () => {
        const editor = getActiveEditor();

        expect(editor).toBeTruthy();
      });
    });

    describe('when editor is not exist', () => {
      beforeEach(() => {
        window.activeTextEditor = undefined;
      });

      it('returns undefined', async () => {
        const editor = getActiveEditor();

        expect(editor).toBeUndefined();
      });
    });
  });

  describe('showMessage', () => {
    const message = 'message';

    it('calls showInformationMessage', async () => {
      showMessage(message);

      expect(window.showInformationMessage).toHaveBeenCalledWith(message);
    });
  });
});
