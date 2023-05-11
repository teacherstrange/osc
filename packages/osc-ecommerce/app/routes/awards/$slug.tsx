import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { PreviewSuspense } from '@sanity/preview-kit';
import { lazy } from 'react';
import type { DynamicLinksFunction } from 'remix-utils';
import { getComponentStyles } from '~/components/Module';
import { PageContent } from '~/components/PageContent';
import { PreviewBanner } from '~/components/PreviewBanner';
import getPageData, { shouldRedirect } from '~/models/sanity.server';
import { AWARDING_BODIES_QUERY } from '~/queries/sanity/awardingbodies';
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
    if (!params.slug) throw new Error('Missing slug');
    // Query the page data
    const data = await getPageData({
        request,
        params,
        query: AWARDING_BODIES_QUERY,
    });

    if (!data?.page) {
        const redirect = await shouldRedirect(request);

        if (redirect) {
            return redirect;
        } else {
            throw new Response('Not found', { status: 404 });
        }
    }

    const { page: awardingBody, isPreview }: PageData = data;

    const hubspotFormData = await getHubspotForms(awardingBody);

    const canonicalUrl = buildCanonicalUrl({
        canonical: awardingBody?.seo?.canonicalUrl,
        request,
    });

    return json({
        awardingBody,
        isPreview,
        canonicalUrl,
        hubspotFormData,
        query: isPreview ? AWARDING_BODIES_QUERY : null,
        params: isPreview ? params : null,
    });
};

// https://github.com/sergiodxa/remix-utils#dynamiclinks
const dynamicLinks: DynamicLinksFunction = ({ data }) => {
    return getComponentStyles(data.awardingBody);
};

export const handle = { dynamicLinks };

export const meta: MetaFunction = ({ data, parentsData }) => {
    const globalSeoSettings = parentsData.root.siteSettings.seo;

    const meta = buildHtmlMetaTags({
        pageData: data.awardingBody,
        globalData: globalSeoSettings,
        canonicalUrl: data.canonicalUrl,
    });

    return meta;
};

export default function Index() {
    const { awardingBody, isPreview, query, params } = useLoaderData<typeof loader>();

    const isPreviewMode = isPreview && query && params;

    return (
        <>
            {isPreviewMode ? <PreviewBanner /> : null}

            {isPreviewMode ? (
                <PreviewSuspense fallback={<PageContent {...awardingBody} />}>
                    <PagePreview query={query} params={params} Component={PageContent} />
                </PreviewSuspense>
            ) : (
                <PageContent {...awardingBody} />
            )}
        </>
    );
}
