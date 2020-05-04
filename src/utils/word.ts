export const linkedTextsRegExp = new RegExp(/\[[a-zA-Z0-9가-힣\s-/]+\]\([[a-zA-Z0-9가-힣\s.-/]+\)/g);
const linkRegExp = new RegExp(/\(.+\)/);

export const extractLinkName = (text: string): string => {
  const words = text.match(linkRegExp);
  if (!words) {
    return '';
  }

  return words[0]
    .replace(/\(|\)/g, '')
    .replace(/\s/g, '-');
};

export const findLinkedTexts = (text: string) => {
  const links = [];

  while (true) {
    const match = linkedTextsRegExp.exec(text);
    if (!match) {
      break;
    }

    links.push({
      text: match[0],
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  return links;
};

export const containsInLink = (
  text: string,
  start: number,
  end: number,
): string | undefined => {
  const link = findLinkedTexts(text)
    .find((i) => i.start <= start && end <= i.end);
  return link ? link.text : undefined;
};

export const deleteExtname = (text: string) => {
  const links = findLinkedTexts(text);

  return text.split(linkedTextsRegExp)
    .reduce((acc, cur, index) => acc + cur + (links[index] ? links[index].text.replace('.md', '') : ''),
      '');
};
