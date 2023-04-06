import { expect, test } from '@playwright/test';
import { PATHS } from '~/constants';

test('menu columns are visible', async ({ page, isMobile }) => {
    await page.goto('/');

    if (isMobile) {
        await page.getByRole('button', { name: 'Open mobile menu' }).click();
    }

    await page.getByRole('button', { name: 'Courses', exact: true }).click();

    // locate all elements with class
    const items = page.locator('.c-nav__item--column');
    const itemsCount = await items.count();

    // loop through them one-by-one to check visibility
    for (let i = 0; i < itemsCount; i++) {
        const loopItem = items.nth(i);

        await expect(loopItem).toBeVisible();
    }
});

test('featured items are visible', async ({ page, isMobile }) => {
    await page.goto('/');

    if (isMobile) {
        await page.getByRole('button', { name: 'Open mobile menu' }).click();
    }

    await page.getByRole('button', { name: 'Courses', exact: true }).click();

    // locate all elements with class
    const items = page.locator('.c-nav__item--feature');
    const itemsCount = await items.count();

    // loop through them one-by-one to check visibility
    for (let i = 0; i < itemsCount; i++) {
        const loopItem = items.nth(i);

        await expect(loopItem).toBeVisible();
    }
});

test('can navigate to a page in the top level of the nav', async ({ page, isMobile }) => {
    await page.goto('/');

    if (isMobile) {
        await page.getByRole('button', { name: 'Open mobile menu' }).click();
    }

    await page
        .getByRole('navigation', { name: 'main' })
        .getByRole('link', { name: 'How it works' })
        .click();
    await expect(page).toHaveURL('/how-it-works');
});

test('can click on the logo to go back to the homepage', async ({ page }) => {
    await page.goto('/how-it-works');

    await page.getByRole('banner').getByRole('link', { name: 'Open Study College' }).click();
    await expect(page).toHaveURL('/');
});

test('can navigate to a page nested within the nav', async ({ page, isMobile }) => {
    await page.goto('/');

    if (isMobile) {
        await page.getByRole('button', { name: 'Open mobile menu' }).click();
    }

    await page.getByRole('button', { name: 'Courses', exact: true }).click();
    await page.getByRole('button', { name: 'Childcare & education', exact: true }).click();
    await page
        .getByRole('link', {
            name: 'NCFE CACHE Level 3 Award in Home Based Childcare - Childminder Route',
        })
        .click();
    await expect(page).toHaveURL(
        `/${PATHS.PRODUCTS}/cache-level-3-award-home-childcare-childminder`
    );
});

test('clicking outside of the menu closes it', async ({ page, isMobile }) => {
    if (!isMobile) {
        await page.goto('/');

        await page.getByRole('button', { name: 'Courses', exact: true }).click();

        const menu = page.locator('.c-nav__content[data-state="open"]');

        await expect(menu).toBeVisible();

        await page.click('body');

        await expect(menu).not.toBeVisible();
    }
});
