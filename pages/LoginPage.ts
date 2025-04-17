import { Locator, Page } from "@playwright/test";
import Environments from "../utils/environments";

export class LoginPage {
    loginButton: Locator;
    emailAddress: Locator;
    password: Locator;
    page: Page;

    constructor(page: Page) {
      this.page = page;
      this.loginButton = page.locator("#send2");
      this.emailAddress = page.locator("#email");
      this.password = page.locator("#pass");
    }

    async goTo() {
      await this.page.goto(Environments.TECH_PANDA_URL);
    }

    async loginWithRequiredFields(emailAddress: string, password: string) {
      await this.emailAddress.waitFor({ state: "visible", timeout: 5000 });
      await this.emailAddress.fill(emailAddress);

      await this.password.waitFor({ state: "visible", timeout: 5000 });
      await this.password.fill(password);

      await this.loginButton.waitFor({ state: "visible", timeout: 5000 });
      await this.loginButton.click();
      
      this.page.on("dialog", (dialog) => dialog.accept());
      await this.page.waitForLoadState("domcontentloaded");
    }
}
