import { test, expect } from '@playwright/test'

test.describe('Accessibility tests', () => {
  let page

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto('baseURL')
    await page.setViewportSize({ width: 1280, height: 800 })
  })

  test.afterEach(async () => {
    await page.close()
  })

  test('Check font size', async () => {
    const fontSize = await page.$eval('body', el => parseFloat(getComputedStyle(el).fontSize))
    expect(fontSize).toBeGreaterThan(15)
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
    console.log('Accessibility tree for Homepage:', JSON.stringify(snapshot, null, 2))
  })

  test('Check page accessibility', async () => {
    const snapshot = await page.accessibility.snapshot()
    console.log('Accessibility tree for Homepage:', JSON.stringify(snapshot, null, 2))
  })
})