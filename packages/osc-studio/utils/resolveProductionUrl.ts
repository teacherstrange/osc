const localUrl = `http://localhost:2000`;
// TODO: Update this
const remoteUrl = `https://your-deployed-website.com`;
const baseUrl = window?.location?.hostname === 'localhost' ? localUrl : remoteUrl;

export function resolveProductionUrl(doc) {
    // Fallback and check the store object if slug isn't available on the doc
    const slug = doc?.slug?.current ? doc?.slug?.current : doc?.store?.slug?.current;

    if (!slug) {
        throw new Error(`Document has no slug, cannot preview`);
    }

    const url = new URL(baseUrl);

    switch (doc._type) {
        case 'home':
            url.pathname = `/`;
            break;

        case 'post':
            url.pathname = `blog/${slug}`;
            break;

        case 'collection':
            url.pathname = `collections/${slug}`;
            break;

        case 'product':
            url.pathname = `products/${slug}`;
            break;

        default:
            url.pathname = slug;
            break;
    }

    url.searchParams.set(`preview`, `true`);

    return url.toString();
}
