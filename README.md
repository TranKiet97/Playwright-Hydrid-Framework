## Playwright installation
- 1 - Nodejs
- 2 - VS Code
- 3 - Create project folder (ex: playwright_hybrid_framework_nopcommerce)
- 4 - Install playwright using terminal: `npm init playwright@latest`
  - To check playwright version:	`npm playwright -v`
  - package.json: node project management file to manage all dependencies
  - playwright.config.js: playwright configuration file
  - tests folder: contains all the playright tests 
- 5 - Install Playright VS Code extension: Playwright Test for VSCode

## Run playwright test
`npx is the path which will point to the path of your playwright module in the node modules`
- Runs all tests on all browsers in headless mode
```bash
npx playwright test
```
- Runs a specific test file 
```bash
npx playwright test MyTest.spec.js
```
- Runs a specific test file on specific browser 
```bash
npx playwright test MyTest.spec.js --project=chromium
```
- Runs all tests on all browsers in headed mode
```bash
npx playwright test --headed
```
- Runs speccific test file in debug mode	
```bash
npx playwright test MyTest.spec.js --debug
```			
- Shows report
```bash
npx playwright show-report
```
- Open the Playwirght UI runner
```bash
npx playwright test --ui
```

## Some notes
- `await` is required only when you are performing the action
```javascript
expect(await page.getByRole('radio', { name: 'Male', exact: true }).isChecked()).toBeFalsy()
await expect(page.getByRole('radio', { name: 'Male', exact: true })).toBeChecked()
```
- `await currentPage.pause()` is used to debug
- If your HTML is like this where label and obviously tag ends with label, for example the edit box is wrapped in the label, we call this as an association. And in this scenerio, `await page.getByLabel("Password").fill("test123")` works. Other than that, another scenerio also works as long as there is association between `for` attribute of that label (`for="exampleInputPassword1"` of the label and `id="exampleInputPassword1"` of the input)
```html
<label>
  Password
  <input type="password" />
</label>

<label for="exampleInputPassword1">Password</label>
<input class="form-control" id="exampleInputPassword1" placeholder="Password" type="password">
```
- To debug using VS code, you can config the command in package.json file. For example
```json
"scripts": {
    "debug": "npx playwright test ./tests/basic/APITestingSessionStorage.spec.js --headed"
  },
```
- And open Command Palatte -> seclect `Debug: Debug npm Script`
- To run scripts `npm run 'debug'`
- To run test cases in test class in parallel we use this scripts
```typescript
test.describe.configure({ mode: 'parallel' });
```
- To tag a test, either provide an additional details object when declaring a test, or add @-token to the test title. Note that tags must start with @ symbol
```typescript
import { test, expect } from '@playwright/test';

test('test login page', {
  tag: '@fast',
}, async ({ page }) => {
  // ...
});

test('test full report @slow', async ({ page }) => {
  // ...
});
```
- You can also tag all tests in a group or provide multiple tags
```typescript
import { test, expect } from '@playwright/test';

test.describe('group', {
  tag: '@report',
}, () => {
  test('test report header', async ({ page }) => {
    // ...
  });

  test('test full report', {
    tag: ['@slow', '@vrt'],
  }, async ({ page }) => {
    // ...
  });
});
```
- You can now run tests that have a particular tag with --grep command line option.
```bash
npx playwright test --grep "@fast"
```
- To config Allure Reporter for project, access this github repo and follow the construction: `https://github.com/allure-framework/allure-js/tree/main/packages/allure-playwright`
- Generate Allure Report after the tests are executed
```bash
allure generate ./allure-results -o ./allure-report
```
- Open the generated report
```bash
allure open ./allure-report
```
