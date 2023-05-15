import { expect, test } from '@playwright/test';
import { PATHS } from '~/constants';

test('adds first product variant to the cart', async ({ page }) => {
    await page.goto(`/${PATHS.PRODUCTS}/aat-level-2-and-3-accounting`);
    await page.getByRole('button', { name: 'Add to bag' }).click();

    // Should be navigated to the cart automatically
    // TODO: This behavior will change when cart is updated and mini cart is added so this will need to be updated to match
    await expect(
        page.getByText('AAT Level 2 and 3 Accounting - Study Pack / Course Material')
    ).toBeVisible();
});

test('adds second product variant to the cart', async ({ page }) => {
    await page.goto(`/${PATHS.PRODUCTS}/aat-level-2-and-3-accounting`);
    await page.getByText('Course Material + Exams').click();

    await page.getByRole('button', { name: 'Add to bag' }).click();
    await expect(
        page.getByText('AAT Level 2 and 3 Accounting - Study Pack / Course Material + Exams')
    ).toBeVisible();
});

test('slide out form keeps in sync with main product form', async ({ page }) => {
    await page.goto(`/${PATHS.PRODUCTS}/aat-level-2-and-3-accounting`);

    // Scroll down the page to active the slide out form
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await page.getByRole('button', { name: 'Enrol now' }).click();
    await expect(page.locator('.c-drawer__content .c-product-form')).toBeVisible();

    await page.getByRole('group', { name: 'Format' }).getByText('Course Material + Exams').click();

    await page.getByRole('button', { name: 'Enrol now' }).click();

    // Scroll back to the top
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page.getByRole('radio', { name: 'Course Material + Exams' })).toBeChecked();
});

test('slide out form adds product to the cart', async ({ page }) => {
    await page.goto(`/${PATHS.PRODUCTS}/aat-level-2-and-3-accounting`);

    // Scroll down the page to active the slide out form
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await page.getByRole('button', { name: 'Enrol now' }).click();
    await expect(page.locator('.c-drawer__content .c-product-form')).toBeVisible();

    await page.getByRole('button', { name: 'Add to bag' }).click();

    // Should be navigated to the cart automatically
    // TODO: This behavior will change when cart is updated and mini cart is added so this will need to be updated to match
    await expect(
        page.getByText('AAT Level 2 and 3 Accounting - Study Pack / Course Material')
    ).toBeVisible();
});
