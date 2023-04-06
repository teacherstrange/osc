import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { PATHS } from '~/constants';

test.describe('User login', () => {
    // Skip for now until auth is merged into main
    test.skip('confirm that the user is logged in', async ({ page }) => {
        await page.goto('/admin');

        const h1 = page.getByRole('heading', {
            level: 1,
        });

        await expect(h1).toBeVisible();
    });
});

// We had an issue where certain pages were hanging when querying the SanityClient
// Since changing out the SanityClient package with PicoSanity We want to check that this is or isn't happening.
// As we're testing that the query in the backend isn't hanging we only need to assert that the page loads
// so we'll check that there's a h1 element.
test.describe('Navigates to a sample of pages without them hanging', () => {
    const checkHeading = async (page: Page) => {
        const h1 = page.getByRole('heading', {
            level: 1,
        });

        await expect(h1).toBeVisible();
    };

    test('successfully navigates to the homepage', async ({ page }) => {
        await page.goto(`${PATHS.HOME}`);

        await checkHeading(page);
    });

    test('successfully navigates to a page', async ({ page }) => {
        await page.goto('/kitchen-sink');

        await checkHeading(page);
    });

    test('successfully navigates to the a level maths page', async ({ page }) => {
        await page.goto(`/${PATHS.PRODUCTS}/a-level-maths`);

        await checkHeading(page);
    });

    test('successfully navigates to the #10 voucher page', async ({ page }) => {
        await page.goto(`/${PATHS.PRODUCTS}/10-pound-gift-voucher`);

        await checkHeading(page);
    });

    test('successfully navigates aat level 2 and 3 accounting page', async ({ page }) => {
        await page.goto(`/${PATHS.PRODUCTS}/aat-level-2-and-3-accounting`);

        await checkHeading(page);
    });

    test('successfully navigates sage 50c computerised accounts level 1', async ({ page }) => {
        await page.goto(`/${PATHS.PRODUCTS}/sage-50c-computerised-accounts-level-1`);

        await checkHeading(page);
    });

    test('successfully navigates to the accounting collections page', async ({ page }) => {
        await page.goto(`/${PATHS.COLLECTIONS}/accounting`);

        await checkHeading(page);
    });

    test('successfully navigates to the animal care collections page', async ({ page }) => {
        await page.goto(`/${PATHS.COLLECTIONS}/animal-care`);
        await checkHeading(page);
    });

    test('successfully navigates to the science collections page', async ({ page }) => {
        await page.goto(`/${PATHS.COLLECTIONS}/science`);
        await checkHeading(page);
    });
});

test('skips focus into the main content', async ({ page }) => {
    await page.goto('/');

    const skipLink = page.getByRole('link', { name: 'Skip to main content' });
    const main = page.getByRole('main');

    await skipLink.focus();

    await expect(skipLink).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(main).toBeFocused();
});
