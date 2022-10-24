import type { Params } from 'react-router-dom';
import type { SanityPage, SanitySiteSetting, SanityRedirect } from '~/types/sanity';
import { getClient } from '~/lib/sanity/getClient.server';

/**
 * Exclude items that contain "drafts" in the _id
 */
export const excludeDrafts = (item: { _id: string }) => !item._id.includes('drafts');

/**
 * Create the url pathname so we can handle subfolders
 */
interface BuildUrlArgs {
    type: SanityRedirect['destination']['_type'];
    url: URL;
    slug: SanityRedirect['destination']['slug'];
}

export const buildUrlPath = ({ type, url, slug }: BuildUrlArgs) => {
    switch (type) {
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

    return url.pathname;
};

interface Args {
    request: Request;
    params?: Params;
    query: string;
}

export default async function getPageData({ request, params, query }: Args) {
    if (!request) throw new Error('Request must be passed');

    const requestUrl = new URL(request?.url);
    const isPreview = requestUrl?.searchParams?.get('preview') ? true : false;

    try {
        const param = params?.slug ? { slug: params.slug } : {};

        const querySanityDataset = await getClient(isPreview).fetch(query, param);

        const pageData = querySanityDataset.filter((item: SanityPage) => {
            // Draft posts are saved with an id of `drafts.<id>`
            const hasDrafts = item._id.includes('drafts');

            // Only try and fetch the previewClient data if drafts exist in the query response
            return isPreview && hasDrafts ? hasDrafts : !hasDrafts;
        })[0];

        return { page: pageData, isPreview };
    } catch (err) {
        console.error(err);
    }
}

export async function getSettingsData({ query }: { query: string }) {
    if (!query) throw new Error('Query must be passed');

    try {
        const siteSettings = await getClient().fetch(query);
        const liveSettings = siteSettings.filter((setting: SanitySiteSetting) =>
            excludeDrafts(setting)
        )[0];

        return liveSettings;
    } catch (err) {
        console.error(err);
    }
}

// export async function shouldRedirect(request: Request) {
//     if (!request) throw new Error('Request must be passed');

//     try {
//         const url = new URL(request.url);
//         const getRedirect = await getClient().fetch(REDIRECT, { slug: url.pathname });
//         const redirectObject = getRedirect.filter((item: SanityRedirect) => excludeDrafts(item))[0];

//         if (!redirectObject) return;

//         const destination = buildUrlPath({
//             type: redirectObject.destination._type,
//             url,
//             slug: redirectObject.destination.slug
//         });

//         return redirect(destination, redirectObject.statusCode);
//     } catch (err) {
//         console.error(err);
//     }
// }
