import { test, expect } from "@playwright/test";

test.only('Log in to Sale Serp sucessfully', async ({ page }) => {
    const usernameTextbox = page.locator('#email');
    const passwordTextbox = page.locator('#password');
    const loginBtn = page.locator("//button[text()='Login']");
    
    await page.goto('https://saleserpdemo.bdtask-demo.com/v10_demo/login');
    await usernameTextbox.fill('justin@email.com');
    await passwordTextbox.fill('123456');
    await loginBtn.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveTitle(/GUI POS/);
})

test('Log in to Sale Serp without Username and Password', async ({ page }) => {
    const errorMessage = page.locator('.alert-danger');

    await page.goto('https://saleserpdemo.bdtask-demo.com/v10_demo/login');
    await page.locator(".btn-success").first().click();
    // it is the same way to use nth()
    // await page.locator(".btn-success").nth(0).click();
    await expect(errorMessage).toContainText('The Email field is required.');
    await expect(errorMessage).toContainText('The Password field is required.');
})