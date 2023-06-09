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

// References to include in 'modules' array in product documents
export const PRODUCT_MODULES = [...MODULES, { type: 'module.recommendedProducts' }];

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
export const PATHS: {
    [key: string]: string;
} = {
    HOME: '/',
    BLOG: 'blog',
    COLLECTIONS: 'collections',
    PRODUCTS: 'courses',
    AWARDS: 'awards',
};

// Colour name map
export const COLOR_NAMES_MAP: {
    [key: string]: string;
} = {
    primary: 'Dark Pink',
    secondary: 'Dark Navy',
    tertiary: 'White',
    quaternary: 'Teal',
    quinary: 'Grey',
    senary: 'Orange',
    septenary: 'Light Pink',
    octonary: 'Light Blue',
    nonary: 'Mid Blue',
    denary: 'Red',
    duodenary: 'Yellow',
    'neutral-0': 'Black',
    'neutral-100': 'Lightest Grey',
    'neutral-200': 'Soft Grey',
    'neutral-300': 'Pale Grey',
    'neutral-400': 'Mid Grey',
    'neutral-500': 'Dark Grey',
    'neutral-600': 'Darker Grey',
    'neutral-700': 'Darkest Grey',
    'gradient-primary': 'Pink - Orange',
    'gradient-primary-90': 'Orange - Pink (90deg)',
    'gradient-primary-180': 'Orange - Pink',
    'gradient-primary-270': 'Pink - Orange (90deg)',
    'gradient-secondary': 'Dark Pink - Light Blue',
    'gradient-secondary-90': 'Light Blue - Dark Pink (90deg)',
    'gradient-secondary-180': 'Light Blue - Dark Pink',
    'gradient-secondary-270': 'Dark Pink - Light Blue (90deg)',
    'gradient-tertiary': 'Teal - Yellow',
    'gradient-tertiary-90': 'Yellow - Teal (90deg)',
    'gradient-tertiary-180': 'Yellow - Teal',
    'gradient-tertiary-270': 'Teal - Yellow (90deg)',
    'gradient-quaternary': 'Dark Pink - Mid Blue',
    'gradient-quaternary-90': 'Mid Blue - Dark Pink (90deg)',
    'gradient-quaternary-180': 'Mid Blue - Dark Pink',
    'gradient-quaternary-270': 'Dark Pink - Mid Blue',
    'gradient-quinary': 'Light Pink - Dark Pink',
    'gradient-quinary-90': 'Dark Pink - Light Pink (90deg)',
    'gradient-quinary-180': 'Dark Pink - Light Pink',
    'gradient-quinary-270': 'Light Pink - Dark Pink (90deg)',
    'gradient-senary': 'Teal - Light Blue',
    'gradient-senary-90': 'Light Blue - Teal (90deg)',
    'gradient-senary-180': 'Light Blue - Teal',
    'gradient-senary-270': 'Teal - Light Blue (90deg)',
    'gradient-septenary': 'Teal - Mid Blue',
    'gradient-septenary-90': 'Mid Blue - Teal (90deg)',
    'gradient-septenary-180': 'Mid Blue - Teal',
    'gradient-septenary-270': 'Teal - Mid Blue (90deg)',
    'gradient-octonary': 'Yellow - Red',
    'gradient-octonary-90': 'Red - Yellow (90deg)',
    'gradient-octonary-180': 'Red - Yellow',
    'gradient-octonary-270': 'Yellow - Red (90deg)',
    'gradient-nonary': 'Light Blue - Yellow',
    'gradient-nonary-90': 'Yellow - Light Blue (90deg)',
    'gradient-nonary-180': 'Yellow - Light Blue',
    'gradient-nonary-270': 'Light Blue - Yellow (90deg)',
    multicolor: 'Multicolor',
};
