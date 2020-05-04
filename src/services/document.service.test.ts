import { isInWikiDir } from '../helpers/document';

describe('DocumentService', () => {
  const basePath = 'vscode_wiki';

  describe('isInWikiDir', () => {
    let document: any;

    describe('with file in basePath and file is markdown', () => {
      beforeEach(() => {
        document = {
          fileName: 'vscode_wiki/index.md',
          languageId: 'markdown',
        };
      });

      it('returns true', async () => {
        const isIn = isInWikiDir(document, basePath);

        expect(isIn).toBe(true);
      });
    });

    describe('when file is not markdown', () => {
      beforeEach(() => {
        document = {
          fileName: 'vscode_wiki/index.md',
          languageId: 'javascript',
        };
      });

      it('returns false', async () => {
        const isIn = isInWikiDir(document, basePath);

        expect(isIn).toBe(false);
      });
    });

    describe('when file is not in bashPath', () => {
      beforeEach(() => {
        document = {
          fileName: 'OTHER_PATH/index.md',
          languageId: 'markdown',
        };
      });

      it('returns false', async () => {
        const isIn = isInWikiDir(document, basePath);

        expect(isIn).toBe(false);
      });
    });
  });
});
