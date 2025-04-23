import { Locator, Page } from "@playwright/test";
import Environments from "../utils/environments";
import { retryMechanism, step } from "./Base";

export class LoginPage {
    readonly loginButton: Locator;
    readonly userName: Locator;
    readonly password: Locator;
    readonly page: Page;

    constructor(page: Page) {
      this.page = page;
      this.loginButton = page.locator("//button[@type='submit']");
      this.userName = page.locator("//input[@name='username']");
      this.password = page.locator("//input[@name='password']");
    }

    @step("Go to OrangeHRM")
    async goTo() {
      await this.page.goto(Environments.ORANGE_HRM_URL, { waitUntil: "domcontentloaded" });
    }

    @step("Login with valid username and password")
    async loginWithRequiredFields(username: string, password: string) {
        await retryMechanism(30000, [1000, 2000, 5000])(async () => {
            await this.userName.fill(username);
            await this.password.fill(password);
            await this.loginButton.click();
            await this.page.waitForLoadState("domcontentloaded");
        });
    }
}
