const { test, expect } = require('@playwright/test')
const { chromium } = require('playwright')
const path = require('path')

const config = require(path.join(process.cwd(), 'playwright.config.js'))
const { pages } = require(path.join(process.cwd(), 'tests', 'pages.json'))

const TIMEOUT = 30000
const pageUrl = `${config.use.baseURL}`

test.describe('MailChimp Integration Test tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl)
  }, TIMEOUT)

  test('Verify email input element', async ({ page }) => {
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
