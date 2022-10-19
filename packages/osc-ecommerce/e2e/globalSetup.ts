import type { FullConfig } from '@playwright/test';
import { chromium } from '@playwright/test';
import faker from '@faker-js/faker';
import { createNewUser } from './helpers/createUser';

async function globalSetup(config: FullConfig) {
    const email = faker.internet.email(undefined, 'osc-ecommerce', 'example.com');
    process.env.FAKE_USER_EMAIL = email; // Make email available across all tests

    const user = await createNewUser(email);

    // Once user is seeded we will navigate to the login page and login. We can then use that to save the login state. See: https://playwright.dev/docs/auth#reuse-signed-in-state
    // Register global login
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(config.projects[0].use.baseURL + '/login');
    await page.getByLabel(/email address/i).fill(user?.email);
    await page.getByLabel(/password/i).fill('myreallystrongpassword');
    await page.getByText(/log in/i).click();
    // Save signed-in state to 'storageState.json'.
    await page.context().storageState({ path: 'e2e/storageState.json' });
    await browser.close();
}

export default globalSetup;
