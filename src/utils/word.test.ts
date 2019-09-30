import { extractLinkName, containsInLink } from './word';

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
