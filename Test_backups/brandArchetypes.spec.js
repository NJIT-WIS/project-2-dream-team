const { test, expect } = require('@playwright/test')
const { chromium } = require('playwright')
const path = require('path')

const config = require(path.join(process.cwd(), 'playwright.config.js'))
const { pages } = require(path.join(process.cwd(), 'tests', 'pages.json'))

const TIMEOUT = 30000

async function checkBrandArchetypeElements (pageUrl) {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(pageUrl, { timeout: TIMEOUT })
  await page.waitForTimeout(2000) // Add a short delay

  // Check for the brand message presence
  const brandMessage = await page.$('h1:has-text("The Future")')
  expect(brandMessage).toBeTruthy()

  // Check for the presence of engagement elements
  const engagementElement = await page.$('button:has-text("Go to Blogs")')
  expect(engagementElement).toBeTruthy()

  await browser.close()
}

pages.forEach((page) => {
  test(`Brand Archetype Testing for "${page.path}"`, async ({}) => {
    const pageUrl = `${config.use.baseURL}${page.path}`
    await checkBrandArchetypeElements(pageUrl)
  })
})
