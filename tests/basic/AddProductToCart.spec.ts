import { test, expect } from "@playwright/test";


test('Add Product To Cart', async ({ page }) => {
   const email = "kanetest@gmail.com";
   const pw = "Test@1234";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client/");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill(pw);
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('domcontentloaded');
   await page.locator(".card-body b").first().waitFor();

   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         await products.nth(i).locator("text = Add To Cart").click();
         break;
      }
   }

   await page.locator("[routerlink*='cart']").click();

   await page.locator("div li").first().waitFor();
   await expect(page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();
   await page.locator("text=Checkout").click();

   await page.locator("[placeholder*='Country']").pressSequentially("ind");
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }

   await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").innerText();
   console.log(orderId);

   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = page.locator("tbody tr");


   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").innerText();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").innerText();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

});