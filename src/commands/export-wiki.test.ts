import { copyFile, extractFrontMatter, deleteExtname } from './export-wiki';
import { promises } from 'fs';

const targetPath = './fixtures/target';
const targetIndexFile = 'Wiki.md';
const wikiPath = './fixtures/wiki';
const wikiIndexFile = `index.md`;

describe('exportWiki', () => {
  beforeEach(async () => {
    const files = await promises.readdir(targetPath, { withFileTypes: true });

    await Promise.all(
      files
        .filter(i => i.isFile())
        .map(i => promises.unlink(`${targetPath}/${i.name}`))
    );
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

  describe('deleteExtname', () => {
    const text =
      'Install [Docker](Docker.md) with [Homebrew](Homebrew.md) test.md';

    it('returns link text without file extname', async () => {
      const output = deleteExtname(text);

      expect(output)
        .toBe('Install [Docker](Docker) with [Homebrew](Homebrew) test.md');
    });
  });
});

