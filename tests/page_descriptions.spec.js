const { test, expect } = require('@playwright/test')
const { chromium } = require('playwright')
const path = require('path')

const config = require(path.join(process.cwd(), 'playwright.config.js'))
const { pages } = require(path.join(process.cwd(), 'tests', 'pages.json'))

const TIMEOUT = 30000
async function checkPageDescription (pageUrl, expectedDescription) {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(pageUrl, { timeout: TIMEOUT })
  const description = await page.$eval('meta[name="description"]', el => el.getAttribute('content'))
  await browser.close()
  expect(description).toBe(expectedDescription)
}

pages.forEach((page) => {
  test(`Page "${page.path}" should have the correct description`, async ({}) => {
    console.log(page.path)
    const pageUrl = `${config.use.baseURL}${page.path}`

    const expectedDescription = page.description
    await checkPageDescription(pageUrl, expectedDescription)
  })
})