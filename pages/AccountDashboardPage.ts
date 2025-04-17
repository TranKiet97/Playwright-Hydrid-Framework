import { expect, Locator, Page } from "@playwright/test";

export class AccountDashboardPage {
    page: Page;
    contactInformation: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contactInformation = page.locator("//h3[text()='Contact Information']/parent::div/following-sibling::div/p");
    }

    async verifyContactInfomation(email: string) {
        await this.contactInformation.waitFor({ state: "visible", timeout: 5000 });
        const contactInformation = await this.contactInformation.textContent();
        expect(contactInformation).toContain(email);
    }
}
