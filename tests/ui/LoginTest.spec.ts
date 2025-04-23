import { test } from "../../pages/Base";   
import * as data from "../../data/login.cred.json";

test.describe('Login Test', { tag: ['@login'] }, () => {        

    test('Should Login Successfully', { tag: ['@smoke'] }, async ({ loginPage, dashboardPage }) => {
        await loginPage.goTo();
        await loginPage.loginWithRequiredFields(data.username, data.password);
        await dashboardPage.verifyLoginSuccessfully();
    });

});
