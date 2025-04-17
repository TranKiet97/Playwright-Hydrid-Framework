import { LoginPage } from "./LoginPage";
import { AccountDashboardPage } from "./AccountDashboardPage";
import { Page } from "@playwright/test";

export class POManager {
    loginPage: LoginPage;
    accountDashboardPage: AccountDashboardPage;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.accountDashboardPage = new AccountDashboardPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getAccountDashboardPage() {
        return this.accountDashboardPage;
    }
}
