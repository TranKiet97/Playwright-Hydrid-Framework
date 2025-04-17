import { Locator, Page } from "@playwright/test";

export class CommonPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    
}