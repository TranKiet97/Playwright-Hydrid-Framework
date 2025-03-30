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