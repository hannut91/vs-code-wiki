import { window } from 'vscode';
import * as path from 'path';
import { promises } from 'fs';

import {
  targetRootFile, rootFile, basePath, targetPath, indexFile,
} from '../config';
import { findLinkedTexts, linkedTextsRegExp } from '../utils/word';

const frontMatterLineRegExp = new RegExp(/---/g);

export const deleteExtname = (text: string) => {
  const texts = text.split(linkedTextsRegExp);

  const links = findLinkedTexts(text);

  return texts.reduce((acc, cur, index) =>
    links[index]
      ? acc + cur + links[index].text.replace('.md', '')
      : acc + cur
    , '');
};

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

  const title = path.basename(target, '.md');

  let newText: string;
  let frontMatter: string;

  try {
    await promises.stat(target);

    const targetContent = (await promises.readFile(target)).toString();

    frontMatter = extractFrontMatter(targetContent);

    newText = frontMatter + '\n\n' + deleteExtname(originText);

    if (newText === targetContent) {
      return;
    }
  } catch (err) {
    frontMatter = `---
title: ${title}
---`;

    newText = frontMatter + '\n\n' + deleteExtname(originText);
  }

  await promises.writeFile(target, newText);
};

export const exportWiki = async () => {
  if (!targetPath || !targetRootFile) {
    window.showInformationMessage('The setting does not exist.');
    return;
  }

  const files = (await promises.readdir(basePath, { withFileTypes: true }))
    .filter(i => i.isFile())
    .filter(i => i.name !== indexFile)
    .map(i => i.name);

  await Promise.all(
    files
      .map(i => copyFile(`${basePath}/${i}`, `${targetPath}/${i}`))
  );

  await copyFile(rootFile, targetRootFile);
};
