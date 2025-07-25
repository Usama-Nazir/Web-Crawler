const {normalizeURL, getURLsFromHTML} = require('./crawl.js');
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

test('getURLsFromHTML absolute', () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://github.com/usama-nazir/">
              Usama Nazir
      </a>
    </body
  </html>
  `
  const inputBaseURL = 'https://github.com/usama-nazir/'
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ['https://github.com/usama-nazir/'];
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative', () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="/web-crawler/">
              web crawler
      </a>
    </body
  </html>
  `
  const inputBaseURL = 'https://github.com/usama-nazir'
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ['https://github.com/usama-nazir/web-crawler/'];
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML both url', () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://github.com/usama-nazir/web-crawler/">
              web crawler
      </a>
      <a href="https://github.com/usama-nazir/sql-data-warehouse/">
              data warehouse
      </a>
    </body
  </html>
  `
  const inputBaseURL = 'https://github.com/usama-nazir'
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ['https://github.com/usama-nazir/web-crawler/', 'https://github.com/usama-nazir/sql-data-warehouse/'];
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML invalid url', () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="/invalid/">
              invalid url
      </a>
    </body
  </html>
  `
  const inputBaseURL = ''
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});