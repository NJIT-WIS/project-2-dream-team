const { test, expect } = require('@playwright/test')
const { chromium } = require('playwright')
const path = require('path')

const config = require(path.join(process.cwd(), 'playwright.config.js'))
const { pages } = require(path.join(process.cwd(), 'tests', 'pages.json'))

test.describe('MailChimp Integration Test tests', () => {
  let page

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto(config.use.baseURL) // Use the baseURL from the configuration
    await page.setViewportSize({ width: 1280, height: 800 })
  }, 10000)

  test.afterEach(async () => {
    await page.close()
  })

  test('Verify email input element', async () => {
    // Find the input element with the "Enter your email" placeholder
    const emailInput = await page.$('input[placeholder="Enter your email"]')

    if (emailInput) {
      const outerHTML = await emailInput.evaluate((el) => el.outerHTML)
      console.log('Email input outer HTML:', outerHTML)
    } else {
      console.log('Email input not found')
    }

    expect(emailInput).not.toBeNull()
  })
})
