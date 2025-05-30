// @ts-check
import { devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  // Directory that will be recursively scanned for test files
  testDir: './tests',
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  // Playwright Test enforces a timeout for each test, 30 seconds by default
  timeout: 50 * 1000,
  // Assertion timeout is unrelated to the test timeout, 5 seconds by default
  expect : {
    timeout: 10 * 1000,
  },
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        globalTimeout: 3600 * 1000,
        screenshot: 'on',
        trace: 'retain-on-failure',
        viewport: { width: 1920, height: 1080 },
        // handle ssl certificate error
        ignoreHttpsErrors: true,
        permissions: ['geolocation']
      }
    },
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: true,
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        globalTimeout: 3600 * 1000,
        screenshot: 'on',
        trace: 'retain-on-failure',
        // config device
        ...devices['iPad Pro 11 landscape']
      }
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: true,
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        globalTimeout: 3600 * 1000,
        screenshot: 'on',
        trace: 'retain-on-failure',
        viewport: { width: 1024, height: 1366 }
      }
    }
  ],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'allure-playwright',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },

  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },

  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   },

  //   /* Test against mobile viewports. */
  //   // {
  //   //   name: 'Mobile Chrome',
  //   //   use: { ...devices['Pixel 5'] },
  //   // },
  //   // {
  //   //   name: 'Mobile Safari',
  //   //   use: { ...devices['iPhone 12'] },
  //   // },

  //   /* Test against branded browsers. */
  //   // {
  //   //   name: 'Microsoft Edge',
  //   //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
  //   // },
  //   // {
  //   //   name: 'Google Chrome',
  //   //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  //   // },
  // ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
module.exports = config
