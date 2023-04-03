import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { PreviewSuspense } from '@sanity/preview-kit';
import type { DynamicLinksFunction } from 'remix-utils';
import { getComponentStyles } from '~/components/Module';
import PageContent, { PagePreview } from '~/components/PageContent';
import { PreviewBanner } from '~/components/PreviewBanner';
import getPageData, { shouldRedirect } from '~/models/sanity.server';
import { POST_QUERY } from '~/queries/sanity/post';
import type { SanityPage } from '~/types/sanity';
import { getHubspotForms } from '~/utils/hubspot.helpers';
import { buildCanonicalUrl } from '~/utils/metaTags/buildCanonicalUrl';
import { buildHtmlMetaTags } from '~/utils/metaTags/buildHtmlMetaTags';

interface PageData {
    page: SanityPage;
    isPreview: boolean;
}

export const loader: LoaderFunction = async ({ request, params }) => {
    if (!params.slug) throw new Error('Missing slug');

    // Query the page data
    const data = await getPageData({
        request,
        params,
        query: POST_QUERY,
    });

    if (!data?.page) {
        const redirect = await shouldRedirect(request);

        if (redirect) {
            return redirect;
        } else {
            throw new Response('Not found', { status: 404 });
        }
    }

    const { page: post, isPreview }: PageData = data;

    const hubspotFormData = await getHubspotForms(post);

    const canonicalUrl = buildCanonicalUrl({
        canonical: post?.seo?.canonicalUrl,
        request,
    });

    return json({
        post,
        isPreview,
        canonicalUrl,
        hubspotFormData,
        query: isPreview ? POST_QUERY : null,
        params: isPreview ? params : null,
        // Note: This makes the token available to the client if they have an active session
        // This is useful to show live preview to unauthenticated users
        // If you would rather not, replace token with `null` and it will rely on your Studio auth
        // TODO: Get token
        // token: isPreview ? token : null,
        token: null,
    });
};

// https://github.com/sergiodxa/remix-utils#dynamiclinks
const dynamicLinks: DynamicLinksFunction = ({ data }) => {
    return getComponentStyles(data.post);
};

export const handle = { dynamicLinks };

export const meta: MetaFunction = ({ data, parentsData }) => {
    const globalSeoSettings = parentsData.root.siteSettings.seo;

    const meta = buildHtmlMetaTags({
        pageData: data.post,
        globalData: globalSeoSettings,
        canonicalUrl: data.canonicalUrl,
    });

    return meta;
};

export default function Index() {
    const { post, isPreview, query, params, token } = useLoaderData<typeof loader>();

    if (
        isPreview &&
        query &&
        params
        // && token
    ) {
        return (
            <>
                <PreviewBanner />
                <PreviewSuspense fallback={<PageContent {...post} />}>
                    <PagePreview query={query} params={params} token={token} />
                </PreviewSuspense>
            </>
        );
    }

    return <PageContent {...post} />;
}
