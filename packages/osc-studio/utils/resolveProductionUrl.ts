import type { SanityDocument, Slug } from 'sanity';
import { PATHS } from '../constants';
const localUrl = `http://localhost:2000`;
// TODO: Update this
const remoteUrl = `https://your-deployed-website.com`;
const baseUrl = window?.location?.hostname === 'localhost' ? localUrl : remoteUrl;

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

        default:
            url.pathname = slug;
            break;
    }

    url.searchParams.set(`preview`, `true`);

    return url.toString();
}
