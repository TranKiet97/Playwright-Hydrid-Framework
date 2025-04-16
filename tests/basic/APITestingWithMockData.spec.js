import { test, expect, request } from '@playwright/test';
import { APIFlow } from '../../utils/APIFlow';
const loginPayload = { "userEmail": "kanetest@gmail.com", "userPassword": "Test@1234" }
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };

let orderId, token;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiFlow = new APIFlow(apiContext);
    token = await apiFlow.getToken(loginPayload);
    orderId = await apiFlow.createOrder(orderPayLoad, token);
})

test('Fake Data With Route Method', async ({ page }) => {
    let body = JSON.stringify(fakePayLoadOrders);
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto("https://rahulshettyacademy.com/client");
    // Intercepting Response - API Response -> { playwright Fake Response } -> Browser -> Render Data on FE
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            route.fulfill(
                {
                    response,
                    body,

                });
        });

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")

    expect((await page.locator(".mt-4").innerText()).trim()).toEqual("You have No Orders to show at this time.\nPlease Visit Back Us");
});

test('Security Test Request Intercept', async ({ page }) => {
    // Login and reach orders page
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'}))
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})