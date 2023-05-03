const { test, expect } = require('@playwright/test')
const { chromium } = require('playwright')
const path = require('path')

const config = require(path.join(process.cwd(), 'playwright.config.js'))
const { pages } = require(path.join(process.cwd(), 'tests', 'pages.json'))

const TIMEOUT = 30000

async function checkPageKeywords (pageUrl, expectedKeywords) {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(pageUrl, { timeout: TIMEOUT })
  await page.waitForTimeout(2000) // Add a short delay
  const metaTags = await page.$$eval('meta', (tags) => tags.map((tag) => ({ name: tag.getAttribute('name'), content: tag.getAttribute('content') })))
  const keywords = metaTags.find((tag) => tag.name === 'keywords' || tag.property === 'keywords')?.content
  await browser.close()
  expect(keywords).toBe(expectedKeywords)
}

pages.forEach((page) => {
  test(`Page "${page.path}" should have the correct keywords`, async ({}) => {
    console.log(page.path)
    const pageUrl = `${config.use.baseURL}${page.path}`

    const expectedKeywords = page.keywords
    await checkPageKeywords(pageUrl, expectedKeywords)
  })
})
