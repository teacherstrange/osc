import { expect, test } from '@playwright/test';

// Skip for now until auth is merged into main
test.skip('confirm that the user is logged in', async ({ page }) => {
    await page.goto('/admin');

    const h1 = page.getByRole('heading', {
        level: 1
    });

    await expect(h1).toBeVisible();
});
