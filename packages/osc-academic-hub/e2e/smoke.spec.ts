import { expect, test } from '@playwright/test';

// Skip for now until auth is merged into main
test.skip('confirm that the user is logged in', async ({ page }) => {
    await page.goto('/admin');

    const h1 = page.getByRole('heading', {
        level: 1
    });

    await expect(h1).toBeVisible();
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
