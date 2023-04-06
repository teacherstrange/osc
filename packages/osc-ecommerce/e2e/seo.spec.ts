import { expect, test } from '@playwright/test';

test('has the default seo settings', async ({ page }) => {
    await page.goto('/seo-defaults');

    const currentPage = page.url();

    const title = await page.title();
    const charset = page.locator('meta[charset]');
    const viewport = page.locator('meta[name="viewport"]');
    const canonical = page.locator('link[rel="canonical"]');
    const ogLocale = page.locator('meta[property="og:locale"]');
    const ogType = page.locator('meta[property="og:type"]');
    const ogUrl = page.locator('meta[property="og:url"]');
    const ogSiteName = page.locator('meta[property="og:site_name"]');
    const articlePublisher = page.locator('meta[property="article:publisher"]');
    const twitterCard = page.locator('meta[name="twitter:card"]');
    const twitterSite = page.locator('meta[name="twitter:site"]');

    expect(title).toBe('SEO defaults | Open Study College');
    await expect(charset).toHaveAttribute('charset', 'utf-8');
    await expect(viewport).toHaveAttribute('content', 'width=device-width,initial-scale=1');
    await expect(canonical).toHaveAttribute('href', currentPage);
    await expect(ogLocale).toHaveAttribute('content', 'en_GB');
    await expect(ogType).toHaveAttribute('content', 'website');
    await expect(ogUrl).toHaveAttribute('content', currentPage);
    await expect(ogSiteName).toHaveAttribute('content', 'Open Study College');
    await expect(articlePublisher).toHaveAttribute(
        'content',
        'https://www.facebook.com/openstudycollege'
    );
    await expect(twitterCard).toHaveAttribute('content', 'summary_large_image');
    await expect(twitterSite).toHaveAttribute('content', 'openstudycoll');
});

test('has a custom title', async ({ page }) => {
    await page.goto('/seo-custom-settings');

    const title = await page.title();
    expect(title).toBe('Custom page title | Open Study College');
});

test('has a custom description', async ({ page }) => {
    await page.goto('/seo-custom-settings');

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute(
        'content',
        'This page has all of the custom SEO settings set'
    );
});

test('has a custom canonical url', async ({ page }) => {
    await page.goto('/seo-custom-settings');

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://www.openstudycollege.com/');
});

test('has a custom og image', async ({ page }) => {
    await page.goto('/seo-custom-settings');

    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute(
        'content',
        'https://cdn.sanity.io/images/v6lebos6/staging/0b0ec081b23cdef9547629799f6b3410960c545e-333x327.png'
    );
});

test('has a noindex tag', async ({ page }) => {
    await page.goto('/seo-custom-settings');

    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute('content', 'noindex');
});
