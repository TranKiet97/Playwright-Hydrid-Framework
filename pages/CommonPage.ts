import { Page, expect } from "@playwright/test";
import { step } from "./Base";
export class CommonPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    
    @step("Accept cookies banner")
    async acceptCookiesBanner() {
        await this.page.addLocatorHandler(
            this.page.getByRole("button", { name: "Accept all" }),
            async () => {
                await this.page.getByRole("button", { name: "Accept all" }).click();
                await expect(this.page.getByRole("button", { name: "Accept all" })).toBeHidden();
            }
        )
    }
    
    
}