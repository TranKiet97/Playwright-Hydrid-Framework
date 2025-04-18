import { Locator, Page } from "@playwright/test";
import Environments from "../utils/Environments";

export class LoginPage {
    loginButton: Locator;
    userName: Locator;
    password: Locator;
    page: Page;

    constructor(page: Page) {
      this.page = page;
      this.loginButton = page.locator("//button[@type='submit']");
      this.userName = page.locator("//input[@name='username']");
      this.password = page.locator("//input[@name='password']");
    }

    async goTo() {
      await this.page.goto(Environments.ORANGE_HRM_URL);
    }

    async loginWithRequiredFields(username: string, password: string) {
      await this.userName.waitFor({ state: "visible", timeout: 5000 });
      await this.userName.fill(username);

      await this.password.waitFor({ state: "visible", timeout: 5000 });
      await this.password.fill(password);

      await this.loginButton.waitFor({ state: "visible", timeout: 5000 });
      await this.loginButton.click();
      
      await this.page.waitForLoadState("domcontentloaded");
    }
}
