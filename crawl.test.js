const {normalizeURL} = require('./crawl.js');
const {test, expect} = require('@jest/globals');

test('normalizeURL strip protocol', () => {
  const input = 'https://github.com/usama-nazir'
  const actual = normalizeURL(input);
  const expected = 'github.com/usama-nazir';
  expect(actual).toEqual(expected);
});

test('normalizeURL trailing slash', () => {
  const input = 'https://github.com/usama-nazir/'
  const actual = normalizeURL(input);
  const expected = 'github.com/usama-nazir';
  expect(actual).toEqual(expected);
});

test('normalizeURL captial', () => {
  const input = 'https://Github.com/usama-nazir/'
  const actual = normalizeURL(input);
  const expected = 'github.com/usama-nazir';
  expect(actual).toEqual(expected);
});

test('normalizeURL strip http', () => {
  const input = 'http://github.com/usama-nazir/'
  const actual = normalizeURL(input);
  const expected = 'github.com/usama-nazir';
  expect(actual).toEqual(expected);
});