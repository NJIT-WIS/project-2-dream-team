import config from '../playwright.config.js'
import { test, expect } from '@playwright/test'

test.describe('Mailchimp Subscription Tests', () => {
  let page

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage()
    // Set a timeout for the page to load
    await page.goto(config.use.baseURL, { timeout: 30000 })
  })

  test.afterEach(async ({ page, testInfo }) => {
    // Take a screenshot of the page after each test case
    const screenshotPath = `screenshots/${testInfo.title}-${testInfo.result}.png`
    await page.screenshot({ path: screenshotPath })
    await page.close()
  })

  test('Email input field is displayed correctly', async ({ page }) => {
    // Assert that the email input field is displayed correctly
    const emailInput = await page.waitForSelector('[placeholder="Enter your email"]')
    expect(emailInput).not.toBeNull()
  })

  test('Email input field is enabled', async ({ page }) => {
    // Assert that the email input field is enabled
    const emailInput = await page.waitForSelector('[placeholder="Enter your email"]')
    const emailInputDisabled = await emailInput?.isEnabled()
    expect(emailInputDisabled).toBe(true)
  })

  test('Email input field is required', async ({ page }) => {
    // Assert that the email input field is required
    const emailInput = await page.waitForSelector('[placeholder="Enter your email"]')
    const emailInputRequired = await emailInput?.getAttribute('required')
    expect(emailInputRequired).not.toBeNull()
  })

  test('Subscription button is displayed correctly', async ({ page }) => {
    // Wait for the Subscribe button to be visible
    await page.waitForSelector('#mc-embedded-subscribe[aria-label="Subscription Button"]')

    // Assert that the subscription button is displayed correctly
    const subscriptionButton = await page.$('#mc-embedded-subscribe')
    expect(subscriptionButton).not.toBeNull()
  })

  test('Subscription button is enabled', async ({ page }) => {
    // Wait for the Subscribe button to be visible
    await page.waitForSelector('#mc-embedded-subscribe')

    // Assert that the subscription button is enabled
    const subscriptionButton = await page.$('#mc-embedded-subscribe')
    const subscribeButtonDisabled = await subscriptionButton?.isEnabled()
    expect(subscribeButtonDisabled).toBe(false)
  })

  test('Subscription button is clickable', async ({ page }) => {
    // Wait for the Subscribe button to be visible
    await page.waitForSelector('#mc-embedded-subscribe')

    // Assert that the subscription button is clickable
    const subscriptionButton = await page.$('#mc-embedded-subscribe')
    const subscribeButtonClickable = await subscriptionButton?.isClickable()
    expect(subscribeButtonClickable).toBe(true)
  })

  test('Subscription button submits the form successfully', async ({ page }) => {
    // Wait for the Subscribe button to be visible
    await page.waitForSelector('#mc-embedded-subscribe')

    // Fill the email input field with the test email address
    const emailInput = await page.waitForSelector('[placeholder="Enter your email"]')
    await emailInput?.click()
    await emailInput?.fill('rajiv_0578@yahoo.co.in')

 import config from '../playwright.config.js'
import { test, expect } from '@playwright/test'

test.describe('Mailchimp Subscription Tests', () => {
  let page

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage()
    // Set a timeout for the page to load
    await page.goto(config.use.baseURL, { timeout: 30000 })
  })

  test.afterEach(async ({ page, testInfo }) => {
    // Take a screenshot of the page after each test case
    const screenshotPath = `screenshots/${testInfo.title}-${testInfo.result}.png`
    await page.screenshot({ path: screenshotPath })
    await page.close()
  })

  test('Email input field is displayed correctly', async ({ page }) => {
    // Assert that the email input field is displayed correctly
    const emailInput = await page.waitForSelector('[placeholder="Enter your email"]')
    expect(emailInput).not.toBeNull()
  })

  test('Email input field is enabled', async ({ page }) => {
    // Assert that the email input field is enabled
    const emailInput = await page.waitForSelector('[placeholder="Enter your email"]')
    const emailInputDisabled = await emailInput?.isEnabled()
    expect(emailInputDisabled).toBe(true)
  })

  test('Email input field is required', async ({ page }) => {
    // Assert that the email input field is required
    const emailInput = await page.waitForSelector('[placeholder="Enter your email"]')
    const emailInputRequired = await emailInput?.getAttribute('required')
    expect(emailInputRequired).not.toBeNull()
  })

  test('Subscription button is displayed correctly', async ({ page }) => {
    // Wait for the Subscribe button to be visible
    await page.waitForSelector('#mc-embedded-subscribe[aria-label="Subscription Button"]')

    // Assert that the subscription button is displayed correctly
    const subscriptionButton = await page.$('#mc-embedded-subscribe')
    expect(subscriptionButton).not.toBeNull()
  })

  test('Subscription button is enabled', async ({ page }) => {
    // Wait for the Subscribe button to be visible
    await page.waitForSelector('#mc-embedded-subscribe')

    // Assert that the subscription button is enabled
    const subscriptionButton = await page.$('#mc-embedded-subscribe')
    const subscribeButtonDisabled = await subscriptionButton?.isEnabled()
    expect(subscribeButtonDisabled).toBe(false)
  })

  test('Subscription button is clickable', async ({ page }) => {
    // Wait for the Subscribe button to be visible
    await page.waitForSelector('#mc-embedded-subscribe')

    // Assert that the subscription button is clickable
    const subscriptionButton = await page.$('#mc-embedded-subscribe')
    const subscribeButtonClickable = await subscriptionButton?.isClickable()
    expect(subscribeButtonClickable).toBe(true)
  })

  test('Subscription button submits the form successfully', async ({ page }) => {
    // Wait for the Subscribe button to be visible
    await page.waitForSelector('#mc-embedded-subscribe')

    // Fill the email input field with the test email address
    const emailInput = await page.waitForSelector('[placeholder="Enter your email"]')
    await emailInput?.click()
    await emailInput?.fill('rajiv_0578@yahoo.co.in')

    // Submit the form by clicking the Subscribe button
    const subscriptionButton = await page.$('[type="submit"][value="Subscribe"]')
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'load' }),
      subscriptionButton?.click()
    ])
    // Assert that the subscription button submits the form successfully
    await page.waitForSelector('#mce-success-response', { timeout: 30000 })
  })
})

