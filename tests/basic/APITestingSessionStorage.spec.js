import { test } from '@playwright/test';

let webContext;
test.beforeAll(async ({ browser }) => {
    const email = "kanetest@gmail.com";
    const pw = "Test@1234";
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(pw);
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');

    await context.storageState({ path: 'state.json' })
    webContext = await browser.newContext({ storageState: 'state.json' })
})

test('API Testing With Session Storage', async () => {
    const page = await webContext.newPage()
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator(".card-body b").first().waitFor();
    // Get all the inner text content from card title elements
    const cardTitles = await page.locator(".card-body b").allInnerTexts();
    // Create a new array with trimmed titles to remove any extra whitespace
    const cardTitlesText = cardTitles.map(title => title.trim());
    console.log(cardTitlesText);
});