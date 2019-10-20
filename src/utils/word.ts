export const linkedTextsRegExp =
  new RegExp(/\[[a-zA-Z\s-]+\]\([[a-zA-Z\s.-]+\)/g);
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
  const links = findLinkedTexts(text);

  const link = links.find(i => i.start <= start && end <= i.end);
  if (link) {
    return link.text;
  }
};

export const deleteExtname = (text: string) => {
  const texts = text.split(linkedTextsRegExp);

  const links = findLinkedTexts(text);

  return texts.reduce((acc, cur, index) =>
    links[index]
      ? acc + cur + links[index].text.replace('.md', '')
      : acc + cur
    , '');
};
