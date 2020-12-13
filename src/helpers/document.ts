export const isInWikiDir = (
  { fileName, languageId }: { fileName: string; languageId: string },
  basePath: string,
): boolean => fileName.toLowerCase().startsWith(basePath.toLowerCase())
  && languageId === 'markdown';
