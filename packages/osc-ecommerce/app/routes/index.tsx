import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { PreviewSuspense } from '@sanity/preview-kit';
import { lazy } from 'react';
import type { DynamicLinksFunction } from 'remix-utils';
import { getComponentStyles } from '~/components/Module';
import { PageContent } from '~/components/PageContent';
import { PreviewBanner } from '~/components/PreviewBanner';
import getPageData from '~/models/sanity.server';
import { HOME_QUERY } from '~/queries/sanity/home';
import type { SanityPage } from '~/types/sanity';
import { getHubspotForms } from '~/utils/hubspot.helpers';
import { buildCanonicalUrl } from '~/utils/metaTags/buildCanonicalUrl';
import { buildHtmlMetaTags } from '~/utils/metaTags/buildHtmlMetaTags';

const PagePreview = lazy(() => import('~/components/PagePreview'));

interface PageData {
    page: SanityPage;
    isPreview: boolean;
}

export const loader: LoaderFunction = async ({ request, params }) => {
    // Query the page data
    const data = await getPageData({
        request,
        query: HOME_QUERY,
    });

    if (!data?.page) {
        throw new Response('Not found', { status: 404 });
    }

    const { page: home, isPreview }: PageData = data;

    const hubspotFormData = await getHubspotForms(home);

    const canonicalUrl = buildCanonicalUrl({
        canonical: home?.seo?.canonicalUrl,
        request,
    });

    return json({
        home,
        hubspotFormData: hubspotFormData ? hubspotFormData : null,
        canonicalUrl,
        isPreview,
        query: isPreview ? HOME_QUERY : null,
        params: isPreview ? params : null,
    });
};

// https://github.com/sergiodxa/remix-utils#dynamiclinks
const dynamicLinks: DynamicLinksFunction = ({ data }) => {
    return getComponentStyles(data.home);
};

export const handle = { dynamicLinks };

export const meta: MetaFunction = ({ data, parentsData }) => {
    const globalSeoSettings = parentsData.root.siteSettings.seo;

    const meta = buildHtmlMetaTags({
        pageData: data.home,
        globalData: globalSeoSettings,
        canonicalUrl: data.canonicalUrl,
    });

    return meta;
};

export default function Index() {
    const { home, isPreview, query, params } = useLoaderData<typeof loader>();
    const isPreviewMode = isPreview && query && params;

    return (
        <>
            {isPreviewMode ? <PreviewBanner /> : null}

            {isPreviewMode ? (
                <PreviewSuspense fallback={<PageContent {...home} />}>
                    <PagePreview query={query} params={params} />
                </PreviewSuspense>
            ) : (
                <PageContent {...home} />
            )}
        </>
    );
}
