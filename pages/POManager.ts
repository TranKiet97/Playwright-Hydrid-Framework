import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage"
import { Page } from "@playwright/test";

export class POManager {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }
}
