import { test } from "@playwright/test";
import { POManager } from "../../pages/POManager";
import * as data from "../../data/login.cred.json";

test.describe('Login Test', { tag: '@login' } , () => {
    test.describe.configure({ mode: 'parallel' });  // To run all test cases in test class in parallel          

    test('Should Login Successfully', { tag: ['@smoke'] }, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.loginWithRequiredFields(data.username, data.password);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.verifyLoginSuccessfully();
    });

});
