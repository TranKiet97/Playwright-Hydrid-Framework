import { test as base, expect } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";

type MyFixture = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
}

export const test = base.extend<MyFixture>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    }
})

export { expect } from '@playwright/test';

/**
 * Decorator function for wrapping POM methods in a test.step.
 *
 * Use it without a step name `@step()`.
 *
 * Or with a step name `@step("Search something")`.
 *
 * @param stepName - The name of the test step.
 * @returns A decorator function that can be used to decorate test methods.
 */
export function step(stepName?: string) {
    return function decorator(
        target: Function,
        context: ClassMethodDecoratorContext
    ) {
        return function replacementMethod(this: any, ...args: any) {
            const name = stepName || `${context.name as string}-${this.name || ''}`
            return test.step(name, async () => {
                return await target.call(this, ...args)
            })
        }
    }
}

/**
 * Decorator function for retrying blocks of code until they are passing successfully
 * 
 * Note that by default toPass has timeout 0 and does not respect custom expect timeout
 *
 * @param timeout - The retry timeout for the function. 
 * @param intervals - The retry intervals for the function.
 * @returns A decorator function that can be used to decorate test methods.
 */
export function retryMechanism(timeout: number = 50000, intervals: number[] = [1000, 2000, 10000]) {
    return async function(callback: () => Promise<void>) {
        await expect(async () => {
            await callback();
        }).toPass({ 
            timeout: timeout, 
            intervals: intervals
        });
    }
}
