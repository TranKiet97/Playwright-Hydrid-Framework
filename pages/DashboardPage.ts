import { expect, Locator, Page } from "@playwright/test";
import { step } from "./Base";

export class DashboardPage {
    readonly page: Page;
    readonly dashboardHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dashboardHeader = page.locator("//h6[text()='Dashboard']");
    }

    @step("Verify login successfully")
    async verifyLoginSuccessfully() {
        await this.dashboardHeader.waitFor({ state: "visible", timeout: 5000 });
        expect(this.dashboardHeader).toBeVisible();
    }
}
