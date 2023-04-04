import { redirect } from '@remix-run/server-runtime';
import type { Params } from 'react-router-dom';
import { PATHS } from '~/constants';
import { getClient } from '~/lib/sanity/getClient.server';
import { getSession } from '~/previewSession.server';
import { REDIRECT } from '~/queries/sanity/redirects';
import type { SanityRedirect, SanitySiteSetting } from '~/types/sanity';

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
            url.pathname = PATHS.HOME;
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

    return url.pathname;
};

interface Args {
    request: Request;
    params?: Params;
    query: string;
}

export default async function getPageData({ request, params, query }: Args) {
    if (!request) throw new Error('Request must be passed');

    const session = await getSession(request.headers.get('Cookie'));
    const isPreview = Boolean(session.get('preview'));

    // TODO: Secure the preview route, making it check if the slug currently exists in the dataset.
    try {
        const param = params?.slug ? { slug: params.slug } : {};
        const querySanityDataset = await getClient(isPreview).fetch(query, param);

        return { page: querySanityDataset[0], isPreview };
    } catch (err) {
        console.error(err);
    }
}

export async function getSettingsData({ query, params }: Omit<Args, 'request'>) {
    if (!query) throw new Error('Query must be passed');

    try {
        const param = params ?? {};

        const siteSettings = await getClient().fetch(query, param);
        const liveSettings = siteSettings.filter((setting: SanitySiteSetting) =>
            excludeDrafts(setting)
        )[0];

        return liveSettings;
    } catch (err) {
        console.error(err);
    }
}

export async function shouldRedirect(request: Request) {
    if (!request) throw new Error('Request must be passed');

    try {
        const url = new URL(request.url);
        const getRedirect = await getClient().fetch(REDIRECT, { slug: url.pathname });
        const redirectObject = getRedirect.filter((item: SanityRedirect) => excludeDrafts(item))[0];

        if (!redirectObject) return;

        const destination = buildUrlPath({
            type: redirectObject.destination._type,
            url,
            slug: redirectObject.destination.slug,
        });

        return redirect(destination, redirectObject.statusCode);
    } catch (err) {
        console.error(err);
    }
}
