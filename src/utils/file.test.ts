import { promises } from 'fs';

import {
  copyFile,
  extractFrontMatter,
  createWikiDirectory
} from './file';

const basePath = `${process.env.HOME}/vscode_wiki`;
const targetPath = __dirname +'/../../fixtures/target';
const targetIndexFile = 'Wiki.md';
const wikiPath = __dirname + '/../../fixtures/wiki';
const wikiIndexFile = `index.md`;

describe('File', () => {
  beforeEach(async () => {
    const files = await promises.readdir(targetPath, { withFileTypes: true });

    await Promise.all(
      files
        .filter(i => i.isFile())
        .map(i => promises.unlink(`${targetPath}/${i.name}`))
    );
  });

  test('Create VS Code wiki directory', async () => {
    try {
      await createWikiDirectory(basePath);
    } catch (err) {
      // Do nothing
    }

    try {
      const stat = await promises.stat(basePath);

      expect(stat.isDirectory()).toBeTruthy();
    } catch (err) {
      expect(err).toBeFalsy();
    }
  });

  describe('copyFile', () => {
    it('copies index file to target directory', async () => {
      await copyFile(`${wikiPath}/${wikiIndexFile}`,
        `${targetPath}/${targetIndexFile}`);

      const s = await promises.stat(`${targetPath}/${targetIndexFile}`);

      expect(s).toBeTruthy();
    });
  });

  describe('extractFrontMatter', () => {
    const content = 'this is wiki';
    const originFrontMatter = `---
title: Wiki
---`;

    let data: string;

    beforeEach(() => {
      data = originFrontMatter + content;
    });

    it('returns Front Matter', async () => {
      const frontMatter = extractFrontMatter(data);

      expect(frontMatter).toBe(originFrontMatter);
    });
  });
});
