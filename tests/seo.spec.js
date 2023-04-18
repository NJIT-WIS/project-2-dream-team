const { chromium } = require('playwright');
const { join } = require('path');
const { readFileSync } = require('fs');
const { renderToStaticMarkup } = require('react-dom/server');
const { default: SEO } = require('../components/SEO');

describe('SEO Test', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page.close();
  });

  test('should set the correct SEO tags', async () => {
    const title = 'MyWebClass | Minimal NextJS Blog Template';
    const description = 'MyWebClass - a minimal nextjs blog template';
    const image = '/images/favicon.png';
    const url = 'https://localhost:3000';

    const seoComponent = <SEO title={title} description={description} image={image} url={url} />;
    const seoTags = renderToStaticMarkup(seoComponent);

    const expectedTags = readFileSync(join(__dirname, '../expected-seo-tags.html'), 'utf8');

    await page.setContent(`<html><head>${seoTags}</head><body></body></html>`);

    const actualTags = await page.$$eval('head > *', (tags) => tags.map((tag) => tag.outerHTML).join('\n'));

    expect(actualTags).toEqual(expectedTags);
  });
});
