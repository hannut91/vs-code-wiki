import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';

import { createWikiDirectory } from './file';

describe('Create Index Test Suite', () => {
  test('Create VS Code wiki directory', async () => {
    try {
      await createWikiDirectory();
    } catch (err) {
      // Do nothing
    }

    try {
      const stat = await util.promisify(fs.stat)(
        path.join(process.env.HOME || '', 'vscode_wiki'));

      expect(stat.isDirectory()).toBeTruthy();
    } catch (err) {
      expect(err).toBeFalsy();
    }
  });
});
