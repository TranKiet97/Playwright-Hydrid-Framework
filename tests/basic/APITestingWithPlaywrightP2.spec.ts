import { test, expect, request } from '@playwright/test';
import { APIFlow } from '../../utils/APIFlow';
const loginPayload = { "userEmail": "kanetest@gmail.com", "userPassword": "Test@1234" }
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };

let orderId: (string | null)[], token: any;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiFlow = new APIFlow(apiContext);
    token = await apiFlow.getToken(loginPayload);
    orderId = await apiFlow.createOrder(orderPayLoad, token);
})

test('API Place The Order', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});