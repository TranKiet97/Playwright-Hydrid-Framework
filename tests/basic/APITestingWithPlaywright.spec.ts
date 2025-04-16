import { test, expect, request } from "@playwright/test";
const loginPayload = {"userEmail":"kanetest@gmail.com","userPassword":"Test@1234"}
let token: any

test.beforeAll(async () => {
    const apiContext = await request.newContext()
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data : loginPayload })
    expect(loginResponse).toBeOK()
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token
    console.log(token)
})

test("Login With API", async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, token)
    await page.goto("https://rahulshettyacademy.com/client/");
    await expect(page).toHaveTitle("Let's Shop")
})

test("Get Eggs Price", async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, token)
    await page.goto("https://rahulshettyacademy.com/client/");
    await expect(page).toHaveTitle("Let's Shop")
})