import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
    page: Page;
    dashboardHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dashboardHeader = page.locator("//h6[text()='Dashboard']");
    }

    async verifyLoginSuccessfully() {
        await this.dashboardHeader.waitFor({ state: "visible", timeout: 5000 });
        expect(this.dashboardHeader).toBeVisible();
    }
}
