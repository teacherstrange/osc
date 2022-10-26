import { test, expect } from '@playwright/test';

test('confirm that the user is logged in', async ({ page }) => {
    await page.goto('/admin');

    const h1 = page.getByRole('heading', {
        level: 1
    });

    await expect(h1).toBeVisible();
});
