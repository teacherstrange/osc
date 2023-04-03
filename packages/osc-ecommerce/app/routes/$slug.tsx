import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { PreviewSuspense } from '@sanity/preview-kit';
import type { DynamicLinksFunction } from 'remix-utils';
import { getComponentStyles } from '~/components/Module';
import PageContent, { PagePreview } from '~/components/PageContent';
import { PreviewBanner } from '~/components/PreviewBanner';
import getPageData, { shouldRedirect } from '~/models/sanity.server';
import { PAGE_QUERY } from '~/queries/sanity/page';
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
        query: PAGE_QUERY,
    });

    if (!data?.page) {
        const redirect = await shouldRedirect(request);

        if (redirect) {
            return redirect;
        } else {
            throw new Response('Not found', { status: 404 });
        }
    }

    const { page, isPreview }: PageData = data;

    const hubspotFormData = await getHubspotForms(page);

    const canonicalUrl = buildCanonicalUrl({
        canonical: page?.seo?.canonicalUrl,
        request,
    });

    return json({
        page,
        canonicalUrl,
        isPreview,
        hubspotFormData: hubspotFormData ? hubspotFormData : null,
        query: isPreview ? PAGE_QUERY : null,
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
    return getComponentStyles(data.page);
};

export const handle = { dynamicLinks };

export const meta: MetaFunction = ({ data, parentsData }) => {
    const globalSeoSettings = parentsData.root.siteSettings.seo;

    const meta = buildHtmlMetaTags({
        pageData: data.page,
        globalData: globalSeoSettings,
        canonicalUrl: data.canonicalUrl,
    });

    return meta;
};

export default function Index() {
    const { page, isPreview, query, params, token } = useLoaderData<typeof loader>();

    if (
        isPreview &&
        query &&
        params
        // && token
    ) {
        return (
            <>
                <PreviewBanner />
                <PreviewSuspense fallback={<PageContent {...page} />}>
                    <PagePreview query={query} params={params} token={token} />
                </PreviewSuspense>
            </>
        );
    }

    return <PageContent {...page} />;
}
