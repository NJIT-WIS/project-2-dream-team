// Import the Playwright configuration
import config from '../playwright.config.js'
import { test, expect } from '@playwright/test'

test.describe('Accessibility tests', () => {
  let page

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage()
    console.log('Navigating to:', config.use.baseURL)
    await page.goto(config.use.baseURL) // Use the baseURL from the configuration
    await page.setViewportSize({ width: 1280, height: 800 })
  }, 10000)

  test.afterEach(async () => {
    await page.close()
  })

  test('Check font size', async ({ page, browserName }) => {
    if (browserName === 'chromium') {
      const fontSize = await page.$eval('body', (el) => parseFloat(getComputedStyle(el).fontSize))
      expect(fontSize).toBeGreaterThan(14)
    } else {
      test.skip()
    }
  })

  test('Check navigation menu button', async () => {
    const menuButton = await page.$('[aria-label="Open Navigation Menu"]')
    expect(menuButton).toBeTruthy()
  })

  test('Check Facebook link', async () => {
    const facebookLink = await page.$('[aria-label="facebook"]')
    expect(facebookLink).toBeTruthy()
  })

  test('Check email input', async () => {
    const emailInput = await page.$('#email')
    const ariaInvalid = await emailInput.getAttribute('aria-invalid')
    expect(ariaInvalid).toBeFalsy()
  })

  test('Check accessibility tree for Homepage', async () => {
    const snapshot = await page.accessibility.snapshot()
    // console.log('Accessibility tree for Homepage:', JSON.stringify(snapshot, null, 2))
  })

  test('Check page accessibility', async () => {
    const snapshot = await page.accessibility.snapshot()
    // console.log('Accessibility tree for Homepage:', JSON.stringify(snapshot, null, 2))
  })
})
