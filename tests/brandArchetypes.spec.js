const { test, expect } = require('@playwright/test')
const { chromium } = require('playwright')
const path = require('path')

const config = require(path.join(process.cwd(), 'playwright.config.js'))
const pageUrl = `${config.use.baseURL}`

const TIMEOUT = 30000

test.describe('Brand Archetype Testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl)
  },TIMEOUT)

test('Check for the brand message presence', async ({ page }) => {
  await page.goto(pageUrl)
  const brandMessage = await page.$('h1:has-text("The Future")')
  expect(brandMessage).toBeTruthy()
})

// test('Check for the presence of informative blog posts', async ({ page }) => {
//  await page.goto(`${pageUrl}/blog`)
//  const blogPosts = await page.$$('.blog-post')
//  expect(blogPosts.length).toBeGreaterThan(0)
// })
//
// test('Check for the presence of email newsletter sign-up form', async ({ page }) => {
//  await page.goto(pageUrl)
//  const newsletterForm = await page.$('#newsletter-form')
//  expect(newsletterForm).toBeTruthy()
// })
//
// test('Check for the presence of team members\' credentials', async ({ page }) => {
//  await page.goto('pageUrl/about')
//  const teamMembers = await page.$$('.team-member')
//  expect(teamMembers.length).toBeGreaterThan(0)
// })
//
// test('Check for the presence of educational resources', async ({ page }) => {
//  await page.goto(`${pageUrl}/resources`)
//  const resources = await page.$$('.resource')
//  expect(resources.length).toBeGreaterThan(0)
// })

test('Check for the presence of engagement elements', async ({ page }) => {
  await page.goto(pageUrl)
  const engagementElement = await page.$('button:has-text("Go to Blogs")')
  expect(engagementElement).toBeTruthy()
})

// test('Check for the presence of news and updates on AI in education', async ({ page }) => {
//  await page.goto(pageUrl)
//  const newsElement = await page.$('.news-element')
//  expect(newsElement).toBeTruthy()
// })
})