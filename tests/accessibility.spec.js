const { test, expect } = require('@playwright/test')
const { chromium } = require('playwright')
const path = require('path')

const config = require(path.join(process.cwd(), 'playwright.config.js'))
const { pages } = require(path.join(process.cwd(), 'tests', 'pages.json'))

const TIMEOUT = 30000

async function runAccessibilityTests (pageUrl) {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(pageUrl, { timeout: TIMEOUT })

  // Check font size
  const fontSize = await page.$eval('body', (el) => parseFloat(getComputedStyle(el).fontSize))
  expect(fontSize).toBeGreaterThan(14)

  // Check navigation menu button
  const menuButton = await page.$('[aria-label="Open Navigation Menu"]')
  expect(menuButton).toBeTruthy()

  // Check Facebook link
  const facebookLink = await page.$('[aria-label="facebook"]')
  expect(facebookLink).toBeTruthy()

  // Check email input
  const emailInput = await page.$('#email')
  const ariaInvalid = await emailInput.getAttribute('aria-invalid')
  expect(ariaInvalid).toBeFalsy()

  // Check accessibility tree for Homepage
  const snapshot = await page.accessibility.snapshot()
  // console.log('Accessibility tree for Homepage:', JSON.stringify(snapshot, null, 2));

  // Check page accessibility
  const pageSnapshot = await page.accessibility.snapshot()
  // console.log('Accessibility tree for Homepage:', JSON.stringify(pageSnapshot, null, 2));

  await browser.close()
}

pages.forEach((page) => {
  test(`Accessibility Testing for "${page.path}"`, async ({ browserName }) => {
    if (browserName === 'chromium') {
      const pageUrl = `${config.use.baseURL}${page.path}`
      await runAccessibilityTests(pageUrl)
    } else {
      test.skip()
    }
  })
})
