import { promises } from 'fs';
import { join } from 'path';

import {
  copyFile,
  extractFrontMatter,
  createWikiDirectory,
  createFile,
} from './file';

const basePath = `${process.env.HOME}/vscode_wiki`;
const targetPath = `${__dirname}/../../fixtures/target`;
const targetIndexFile = 'Wiki.md';
const wikiPath = `${__dirname}/../../fixtures/wiki`;
const wikiIndexFile = 'index.md';

describe('File', () => {
  beforeEach(async () => {
    const files = await promises.readdir(targetPath, { withFileTypes: true });

    await Promise.all(
      files
        .filter((i) => i.isFile())
        .filter((i) => i.name !== '.gitkeep')
        .map((i) => promises.unlink(`${targetPath}/${i.name}`)),
    );
  });

  test('Create VS Code wiki directory', async () => {
    try {
      await createWikiDirectory(basePath);
    } catch (err) {
      // Do nothing
    }

    const stat = await promises.stat(basePath);

    expect(stat.isDirectory()).toBeTruthy();
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

  describe('createFile', () => {
    let fileName = '';

    describe('with only file name', () => {
      beforeEach(() => {
        fileName = 'test.md';
      });
      it('creates file to path', async () => {
        const path = join(targetPath, fileName);
        await createFile(path);

        const s = await promises.stat(path);

        expect(s).toBeTruthy();
      });
    });

    describe('with file name has subdirectory path', () => {
      beforeEach(() => {
        fileName = 'apple/apple.md';
      });

      it('creates file to path', async () => {
        const path = join(targetPath, fileName);
        await createFile(path);

        const s = await promises.stat(path);

        expect(s).toBeTruthy();
      });
    });
  });
});
