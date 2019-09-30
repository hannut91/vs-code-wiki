import * as fs from 'fs';
import * as util from 'util';

import { createWikiDirectory } from './file';
import { basePath } from '../config';

describe('Create Index Test Suite', () => {
  test('Create VS Code wiki directory', async () => {
    try {
      await createWikiDirectory();
    } catch (err) {
      // Do nothing
    }

    try {
      const stat = await util.promisify(fs.stat)(
        basePath);

      expect(stat.isDirectory()).toBeTruthy();
    } catch (err) {
      expect(err).toBeFalsy();
    }
  });
});
