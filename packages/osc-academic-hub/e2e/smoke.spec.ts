import { test, expect } from '@playwright/test';

test('confirm that the user is logged in', async ({ page }) => {
    await page.goto('/admin');

    const button = page.getByRole('button', {
        name: 'logout'
    });

    await expect(button).toBeVisible();
});
