import type { SanityDocument, Slug } from 'sanity';
import { PATHS } from '../constants';

const requestUrl = new URL(window?.location?.origin);
const prefixRegex = /((pr-)\d+)/g; // This bit of regex finds any text that matches "pr-<n>" e.g. pr-123

let remoteUrl;

// Check if the current request Url contains a preview prefix
if (requestUrl.hostname.match(prefixRegex)) {
    const urlPrefix = requestUrl.hostname.match(prefixRegex)?.join('');

    remoteUrl = `https://${urlPrefix}-osc-ecommerce.fly.dev`;
} else {
    remoteUrl = `https://osc-ecommerce.fly.dev`;
}

const baseUrl = window?.location?.hostname === 'localhost' ? 'http://localhost:2000' : remoteUrl;

export type SanityDocumentWithSlug = SanityDocument & {
    slug: Slug;
    store: {
        slug: Slug;
    };
};

export function resolveProductionUrl(doc: SanityDocumentWithSlug) {
    // Fallback and check the store object if slug isn't available on the doc
    const slug = doc?.slug?.current ? doc?.slug?.current : doc?.store?.slug?.current;

    if (!slug) {
        throw new Error(`Document has no slug, cannot preview`);
    }

    const url = new URL(baseUrl);
    const previewPath = '/resources/preview';
    const param = 'slug';
    url.pathname = previewPath;

    switch (doc._type) {
        case 'home':
            url.pathname = `${PATHS.HOME}`;
            break;

        case 'post':
            url.pathname = `${PATHS.BLOG}/${slug}`;
            break;

        case 'collection':
            url.pathname = `${PATHS.COLLECTIONS}/${slug}`;
            break;

        case 'product':
            url.pathname = `${PATHS.PRODUCTS}/${slug}`;
            break;
        case 'award':
            url.pathname = `${PATHS.AWARDS}/${slug}`;
            break;

        default:
            url.search = `?${param}=${slug}`;

            break;
    }

    return url.toString();
}
