const path = require('path');
const { chromium } = require('playwright');

const config = require(path.join(process.cwd(), 'playwright.config.js'));
const { pages } = require(path.join(process.cwd(), 'tests', 'pages.json'));

const TIMEOUT = 30000;

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`Expected ${expected}, but got ${actual}.`);
      }
    },
  };
}

async function checkPageOgDescription(pageUrl, expectedOgDescription) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(pageUrl, { timeout: TIMEOUT });
  const ogDescription = await page.$eval('meta[property="og:description"]', el => el.getAttribute('content'));
  await browser.close();
  expect(ogDescription).toBe(expectedOgDescription);
}

pages.forEach((page) => {
  console.log(`Testing page "${page.path}" for og:Description...`);
  const pageUrl = `${config.use.baseURL}${page.path}`;
  const expectedOgDescription = page.ogDescription;
  checkPageOgDescription(pageUrl, expectedOgDescription)
    .then(() => console.log(`Page "${page.path}" passed the og:description test.`))
    .catch(error => console.error(`Page "${page.path}" failed the og:description test: ${error}`));
});
