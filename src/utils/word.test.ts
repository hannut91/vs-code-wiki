import {
  extractLinkName, containsInLink, deleteExtname, findLinkedTexts
} from './word';

test('extract word', () => {
  expect(extractLinkName('[Docker](Docker)')).toBe('Docker');
  expect(extractLinkName('[Text with space](text with space)'))
    .toBe('text-with-space');
});

test('containsInLink', () => {
  const text = '## How to install [Docker](Docker) on [macOS X](macOS X) using HomeBrew';

  expect(containsInLink(text, 0, 2)).toBeUndefined();
  expect(containsInLink(text, 18, 32)).toBe('[Docker](Docker)');
  expect(containsInLink(text, 18, 34)).toBe('[Docker](Docker)');
  expect(containsInLink(text, 38, 39)).toBe('[macOS X](macOS X)');
});

test('deleteExtname', () => {
  expect(
    deleteExtname(
      'Install [Docker](Docker.md) with [Homebrew](Homebrew.md) test.md'
    )
  ).toBe('Install [Docker](Docker) with [Homebrew](Homebrew) test.md');
});

test('findLinkedTexts', () => {
  expect(findLinkedTexts('[TestLink](TestLink.md)')).toEqual(
    [{start: 0, end: 23, text: '[TestLink](TestLink.md)'}]
  );

  expect(findLinkedTexts('[Test2Link](Test2Link.md)')).toEqual(
    [{start: 0, end: 25, text: '[Test2Link](Test2Link.md)'}]
  );
});
