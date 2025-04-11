import { test, expect } from "@playwright/test"


test('Playwright on Handling Calendar', async ({ page }) => {

    const date = "28"
    const month = "12"
    const year = "2011"
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    await page.locator(".react-date-picker__calendar-button__icon").click()
    await page.locator(".react-calendar").isVisible()
    await page.locator(".react-calendar__navigation__label").click()
    await page.locator(".react-calendar__navigation__label").click()
    while(!await page.locator(".react-calendar__decade-view__years__year", { hasText : year }).isVisible()) {
        if(Number(await page.locator(".react-calendar__decade-view__years__year").nth(0).textContent()) > Number(year)) {
            await page.locator(".react-calendar__navigation__prev-button").click()
        } else {
            await page.locator(".react-calendar__navigation__next-button").click()
        }
    }
    await page.locator(".react-calendar__decade-view__years__year", { hasText : year }).click()
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month) - 1).click()
    await page.locator(".react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--neighboringMonth)").nth(Number(date) - 1).click()
    const deliveryDay = await page.locator(".react-date-picker__inputGroup__day").getAttribute("value")
    const deliveryMonth = await page.locator(".react-date-picker__inputGroup__month").getAttribute("value")
    const deliveryYear = await page.locator(".react-date-picker__inputGroup__year").getAttribute("value")
    expect(date).toEqual(deliveryDay)
    expect(month).toEqual(deliveryMonth)
    expect(year).toEqual(deliveryYear)

})