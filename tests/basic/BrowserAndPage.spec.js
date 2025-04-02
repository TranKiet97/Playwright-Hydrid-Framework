// @ts-check
import { test, expect } from '@playwright/test';

test('Browser Context Playwright Test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://playwright.dev/");
  console.log(await page.title())
});

test('Page Playwright Test', async ({ page }) => {
  // You do not have anything special to inject in that browser, like cookies are proxy, plugins, ... 
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
