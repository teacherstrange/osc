import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(`/search`);
});
test('should return filtered hits based on query in searchbox ', async ({ page }) => {
    await page.fill('input[type="search"]', 'Biology');
    await page.getByRole('combobox', { name: 'sortBy_select' }).click();
    await page.getByText('Alphabetical - Z to A').click();

    expect(await page.locator('a >> span >> text="View course"').count()).toBe(5);
});
test('should filter hits when selecting options from a refinement list', async ({ page }) => {
    await page.getByRole('button', { name: 'Award', exact: true }).click();
    await page.getByRole('checkbox', { name: 'A Level' }).click();
    await page.getByRole('combobox', { name: 'sortBy_select' }).click();
    await page.getByText('Alphabetical - Z to A').click();

    await expect(page.getByText('Showing 18 Results')).toBeVisible();
});

test('should clear all filters then "Clear All" button is pressed', async ({ page }) => {
    await page.getByRole('button', { name: 'Award', exact: true }).click();
    await page.getByRole('checkbox', { name: 'A Level' }).click();
    await page.getByRole('combobox', { name: 'sortBy_select' }).click();
    await page.getByText('Alphabetical - Z to A').click();

    await expect(page.getByText('Showing 18 Results')).toBeVisible();

    await page.getByRole('button', { name: 'Clear All' }).click();
    await page.getByRole('combobox', { name: 'sortBy_select' }).click();
    await page.getByText('Alphabetical - A to Z').click();

    await expect(page.getByText('Showing 664 Results')).toBeVisible();
});

test('should reorder the results when SortBy is changed', async ({ page }) => {
    await page.getByRole('combobox', { name: 'sortBy_select' }).click();
    await page.getByText('Alphabetical - Z to A').click();
    await page.getByRole('combobox', { name: 'sortBy_select' }).click();
    await page.getByText('Alphabetical - A to Z').click();

    expect(
        await page
            .locator('section')
            .filter({
                hasText: '10 Pound Gift Voucher',
            })
            .innerText()
    ).toContain('10 Pound Gift Voucher');

    await page.getByRole('combobox', { name: 'sortBy_select' }).click();
    await page.getByText('Alphabetical - Z to A').click();

    expect(
        await page
            .locator('section')
            .filter({
                hasText: 'Zoology QLS Level 3',
            })
            .innerText()
    ).toContain('Zoology QLS Level 3');
});

test('should change the view to grid when "List View" is updated to "Grid View" ', async ({
    page,
}) => {
    await page.fill('input[type="search"]', 'Biology');
    await page.getByRole('combobox', { name: 'sortBy_select' }).click();
    await page.getByText('Alphabetical - Z to A').click();

    expect(
        page.locator('section').filter({
            hasText: 'Marine Biology QLS Level 3',
        })
    ).toHaveClass('c-card__inner o-grid__col--12');

    await page.getByRole('combobox', { name: 'view_select' }).click();
    await page.getByText('Grid View').click();

    await expect(
        page.locator('section').filter({
            hasText: 'Marine Biology QLS Level 3',
        })
    ).toHaveClass('c-card__inner o-grid__col--6@tab o-grid__col--12');
});

test('should search for course and navigate to the correct course when the "View Course" button is selected', async ({
    page,
}) => {
    await page.fill('input[type="search"]', 'Biology');
    await page.getByRole('combobox', { name: 'sortBy_select' }).click();
    await page.getByText('Alphabetical - Z to A').click();

    await page.getByRole('link', { name: 'View course Marine Biology QLS Level 3' }).click();

    await page.waitForURL('/courses/marine-biology-3');

    // Some strange behaviour here - It doesn't seem to load the page unless I await and add a click event
    await page.getByText('Marine Biology QLS Level 3').click();
});
