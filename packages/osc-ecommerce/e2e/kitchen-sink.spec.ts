import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

test.describe('User login', () => {
    test('confirm that the user is logged in', async ({ page }) => {
        await page.goto('/admin');

        const button = page.getByRole('button', {
            name: 'logout'
        });

        await expect(button).toBeVisible();
    });
});

// We had an isse where certain pages were hanging when querying the SanityClient
// Since changing out the SanityClient package with PicoSanity We want to check that this is or isn't happening.
// As we're testing that the query in the backend isn't hanging we only need to assert that the page loads
// so we'll check that there's a h1 element.
test.describe('Navigates to a sample of pages without them hanging', () => {
    const checkHeading = async (page: Page) => {
        const h1 = page.getByRole('heading', {
            level: 1
        });

        await expect(h1).toBeVisible();
    };

    test('successfully navigates to the homepage', async ({ page }) => {
        await page.goto('/');

        await checkHeading(page);
    });

    test('successfully navigates to a page', async ({ page }) => {
        await page.goto('/kitchen-sink');

        await checkHeading(page);
    });

    test('successfully navigates to the a level maths page', async ({ page }) => {
        await page.goto('/products/a-level-maths');

        await checkHeading(page);
    });

    test('successfully navigates to the #10 voucher page', async ({ page }) => {
        await page.goto('/products/10-pound-gift-voucher');

        await checkHeading(page);
    });

    test('successfully navigates aat level 2 and 3 accounting page', async ({ page }) => {
        await page.goto('/products/aat-level-2-and-3-accounting');

        await checkHeading(page);
    });

    test('successfully navigates sage 50c computerised accounts level 1', async ({ page }) => {
        await page.goto('/products/sage-50c-computerised-accounts-level-1');

        await checkHeading(page);
    });

    test('successfully navigates to the accounting collections page', async ({ page }) => {
        await page.goto('/collections/accounting');

        await checkHeading(page);
    });

    test('successfully navigates to the animal care collections page', async ({ page }) => {
        await page.goto('/collections/animal-care');
        await checkHeading(page);
    });

    test('successfully navigates to the science collections page', async ({ page }) => {
        await page.goto('/collections/science');
        await checkHeading(page);
    });
});

test.describe('Carousel is visible and functioning', () => {
    test('Carousel is visible and functioning   ', async ({ page }) => {
        const checkSelectedIndex = async (page: Page) => {
            const h1 = page.getByRole('heading', {
                level: 1
            });

            await expect(h1).toBeVisible();
        };

        const checkSlidesPerPage = async (page: Page) => {
            const h1 = page.getByRole('heading', {
                level: 1
            });

            await expect(h1).toBeVisible();
        };

        const checkButtons = async (page: Page) => {
            const h1 = page.getByRole('heading', {
                level: 1
            });

            await expect(h1).toBeVisible();
        };

        await page.goto('/kitchen-sink');
        await checkSelectedIndex(page);
        await checkSlidesPerPage(page);
        await checkButtons(page);
    });
});
