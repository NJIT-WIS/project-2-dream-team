const path = require('path')
const { chromium } = require('playwright')

const config = require(path.join(process.cwd(), 'playwright.config.js'))
const { pages } = require(path.join(process.cwd(), 'tests', 'pages.json'))

const TIMEOUT = 30000

function expect (actual) {
  return {
    toBe (expected) {
      if (actual !== expected) {
        throw new Error(`Expected ${expected}, but got ${actual}.`)
      }
    }
  }
}

async function checkPageOgTitle (pageUrl, expectedOgTitle) {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(pageUrl, { timeout: TIMEOUT })
  const ogTitle = await page.$eval('meta[property="og:title"]', el => el.getAttribute('content'))
  await browser.close()
  expect(ogTitle).toBe(expectedOgTitle)
}

pages.forEach((page) => {
  console.log(`Testing page "${page.path}" for og:title...`)
  const pageUrl = `${config.use.baseURL}${page.path}`
  const expectedOgTitle = page.ogTitle
  checkPageOgTitle(pageUrl, expectedOgTitle)
    .then(() => console.log(`Page "${page.path}" passed the og:title test.`))
    .catch(error => console.error(`Page "${page.path}" failed the og:title test: ${error}`))
})
