import type { Params } from 'react-router-dom';
import type { SanityPage, SanitySiteSetting } from '~/types/sanity';
import { getClient } from '~/lib/sanity/getClient.server';

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
        const liveSettings = siteSettings.filter(
            (setting: SanitySiteSetting) => !setting._id.includes('drafts')
        )[0];

        return liveSettings;
    } catch (err) {
        console.error(err);
    }
}
