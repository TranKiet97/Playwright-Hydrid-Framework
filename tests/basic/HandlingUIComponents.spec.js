import { test, expect } from "@playwright/test";

test('Handling Textbox, Default Dropdown, Radio Button', async ({ page }) => {
    const firstNameTextbox = page.locator("input[name='firstname']")
    const lastNameTextbox = page.locator("input[name='lastname']")
    const dayDropdown = page.locator("select[id='day']")
    const monthDropdown = page.locator("select[id='month']")
    const yearDropdown = page.locator("select[id='year']")
    const maleRadioBtn = page.getByRole('radio', { name: 'Male', exact: true })
    await page.goto('https://www.facebook.com/r.php?entry_point=login')
    // Textbox
    await firstNameTextbox.fill('Kane')
    await lastNameTextbox.fill('Tran')
    // Default Dropdown
    await dayDropdown.selectOption('20')
    await monthDropdown.selectOption('Apr')
    await yearDropdown.selectOption('1997')
    // Radio Btn
    expect(await maleRadioBtn.isChecked()).toBeFalsy()
    if (!await maleRadioBtn.isChecked()) {
        await maleRadioBtn.check()
        await expect(maleRadioBtn).toBeChecked()
    }
    // uncheck() is just used for checkbox
    // await page.getByRole('radio', { name: 'Male', exact: true }).uncheck()
});

test('Handling Multi Dropdown', async ({ page }) => {
    await page.goto('https://multiple-select.wenzhixin.net.cn/templates/template.html?v=189&url=basic.html')
    await page.locator('select[multiple="multiple"]').first().selectOption(['January', 'April', 'March']);
});

test('Handling Windows and Tabs', async ({ browser }) => {
    const context = await browser.newContext()
    const currentPage = await context.newPage()
    const googleLink = currentPage.locator("//a[text()='GOOGLE']")

    await currentPage.goto('https://automationfc.github.io/basic-form/index.html')
    // Listen for any new page -> return 3 status (pending, rejected, fulfilled)
    const [newPage] = await Promise.all(
        [context.waitForEvent('page'), 
        googleLink.click()]
    )

    await expect(newPage).toHaveTitle("Google")
    
    await currentPage.locator('#mail').fill("kanetran@gmail.com")
});

test('Handling Element Visibility and Dialog/Frame', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    const element = page.locator('#displayed-text')

    // Element Visibility
    await expect(element).toBeVisible()
    await page.locator("#hide-textbox").click()
    await expect(element).toBeHidden()

    // Dialog
    await page.locator("#confirmbtn").click()
    page.on('dialog', dialog => dialog.accept())
    await page.locator("#confirmbtn").click()
    page.on('dialog', dialog => dialog.dismiss())

    // Frame/iFrame
    const framePage = page.frameLocator("#courses-iframe")
    await expect(framePage).toHaveTitle("Selenium, API Testing, Software Testing & More QA Tutorials  | Rahul Shetty Academy")
});
