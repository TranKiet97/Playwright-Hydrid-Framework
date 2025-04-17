import { describe } from "node:test";
import { test } from "@playwright/test";
import { POManager } from "../../pages/POManager";
import * as data from "../../data/login.cred.json";

describe('Login Test', () => {

    test('Should Login Successfully', async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.loginWithRequiredFields(data.email, data.password);

        const accountDashboardPage = poManager.getAccountDashboardPage();
        await accountDashboardPage.verifyContactInfomation(data.email);
    });

});
