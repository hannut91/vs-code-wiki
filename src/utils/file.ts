import { dirname, basename } from 'path';
import { promises } from 'fs';

import { deleteExtname } from './word';

const frontMatterLineRegExp = new RegExp(/---/g);

export const createWikiDirectory = (path: string) => promises.mkdir(path, { recursive: false });

export const createFile = async (filePath: string): Promise<string> => {
  try {
    await promises.stat(filePath);
  } catch (err) {
    await promises.mkdir(dirname(filePath), { recursive: true });
    await promises.writeFile(filePath, '');
  }

  return filePath;
};

export const createIndexFile = async (): Promise<string> => await createFile('index.md');

export const extractFrontMatter = (content: string) => {
  const boundaries = [];

  while (true) {
    const match = frontMatterLineRegExp.exec(content);
    if (!match) {
      break;
    }

    boundaries.push(match.index);
  }

  if (boundaries.length < 2 || boundaries[0] !== 0) {
    throw new Error('Front Matter is not exist');
  }

  return content.slice(boundaries[0], boundaries[1] + '---'.length);
};

export const copyFile = async (origin: string, target: string) => {
  const originText = (await promises.readFile(origin)).toString();

  const title = basename(target, '.md');

  let newText: string;
  let frontMatter: string;

  try {
    await promises.stat(target);

    const targetContent = (await promises.readFile(target)).toString();

    frontMatter = extractFrontMatter(targetContent);

    newText = `${frontMatter}\n\n${deleteExtname(originText)}`;

    if (newText === targetContent) {
      return;
    }
  } catch (err) {
    frontMatter = `---
title: ${title}
---`;

    newText = `${frontMatter}\n\n${deleteExtname(originText)}`;
  }

  await promises.writeFile(target, newText);
};
