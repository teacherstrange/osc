// Currency code (ISO 4217) to use when displaying prices in the studio
// https://en.wikipedia.org/wiki/ISO_4217
export const DEFAULT_CURRENCY_CODE = 'GBP';

// Document ids which:
// - cannot be created in the 'new document' menu
// - cannot be duplicated, unpublished or deleted
export const LOCKED_DOCUMENT_IDS = ['home', 'settings', 'blog'];

// Document types which:
// - cannot be created in the 'new document' menu
// - cannot be duplicated, unpublished or deleted
export const LOCKED_DOCUMENT_TYPES = ['media.tag'];

// Document types which:
// - cannot be created in the 'new document' menu
// - cannot be duplicated, unpublished or deleted
// - are from the Sanity Connect Shopify app - and can be linked to on Shopify
export const SHOPIFY_DOCUMENT_TYPES = ['product', 'productVariant', 'collection'];

// References to include in 'internal' links
export const PAGE_REFERENCES = [
    { type: 'collection' },
    { type: 'home' },
    { type: 'page' },
    { type: 'product' },
    { type: 'blog' },
    { type: 'post' },
];

// References to include in 'modules' array in documents
export const MODULES = [
    { type: 'module.accordion' },
    { type: 'module.content' },
    { type: 'module.cards' },
    { type: 'module.carousel' },
    { type: 'module.contentMedia' },
    { type: 'module.forms' },
    { type: 'module.hero' },
    { type: 'module.images' },
    { type: 'module.tabs' },
    { type: 'module.trustpilot' },
    { type: 'module.textGrid' },
    { type: 'module.video' },
];

// Space values to use in the 'spacing' field type
export const SPACING = ['2xs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'];

// API version to use when using the Sanity client within the studio
// https://www.sanity.io/help/studio-client-specify-api-version
export const SANITY_API_VERSION = '2021-10-21';

// Your Shopify store ID.
// This is your unique store URL (e.g. 'my-store-name.myshopify.com').
// Set this to enable helper links in document status banners and shortcut links on products and collections.
export const SHOPIFY_STORE_ID = 'openstudydev.myshopify.com';

// The route paths for the different pages in the ecommerce app
export const PATHS = {
    HOME: '/',
    BLOG: 'blog',
    COLLECTIONS: 'collections',
    PRODUCTS: 'courses',
    AWARDS: 'awards',
};
