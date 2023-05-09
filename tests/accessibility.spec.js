const { test, expect } = require('@playwright/test')
const { chromium } = require('playwright')
const path = require('path')

const config = require(path.join(process.cwd(), 'playwright.config.js'))
const { pages } = require(path.join(process.cwd(), 'tests', 'pages.json'))

const TIMEOUT = 30000
const pageUrl = `${config.use.baseURL}`

test.describe('Accessibility Testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl)
  })

  test('Check font size', async ({ page, browserName }) => {
    if (browserName === 'chromium') {
      const fontSize = await page.$eval('body', (el) => parseFloat(getComputedStyle(el).fontSize))
      expect(fontSize).toBeGreaterThan(14)
    } else {
      test.skip()
    }
  })

  test('Check navigation menu button', async ({ page }) => {
    const menuButton = await page.$('[aria-label="Open Navigation Menu"]')
    expect(menuButton).toBeTruthy()
  })

  test('Check Facebook link', async ({ page }) => {
    const facebookLink = await page.$('[aria-label="facebook"]')
    expect(facebookLink).toBeTruthy()
  })

  test('Check email input', async ({ page }) => {
    const emailInput = await page.$('#email')
    const ariaInvalid = await emailInput.getAttribute('aria-invalid')
    expect(ariaInvalid).toBeFalsy()
  })

  test('Check accessibility tree for Homepage', async ({ page }) => {
    const snapshot = await page.accessibility.snapshot()
    // console.log('Accessibility tree for Homepage:', JSON.stringify(snapshot, null, 2));
  })

  test('Check page accessibility', async ({ page }) => {
    const snapshot = await page.accessibility.snapshot()
    // console.log('Accessibility tree for Homepage:', JSON.stringify(snapshot, null, 2));
  })
})
