import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { PreviewSuspense } from '@sanity/preview-kit';
import type { DynamicLinksFunction } from 'remix-utils';
import { getComponentStyles } from '~/components/Module';
import PageContent, { PagePreview } from '~/components/PageContent';
import { PreviewBanner } from '~/components/PreviewBanner';
import getPageData, { shouldRedirect } from '~/models/sanity.server';
import { BLOG_QUERY } from '~/queries/sanity/blog';
import type { SanityPage } from '~/types/sanity';
import { getHubspotForms } from '~/utils/hubspot.helpers';
import { buildCanonicalUrl } from '~/utils/metaTags/buildCanonicalUrl';
import { buildHtmlMetaTags } from '~/utils/metaTags/buildHtmlMetaTags';

interface PageData {
    page: SanityPage;
    isPreview: boolean;
}

export const loader: LoaderFunction = async ({ request, params }) => {
    // Query the page data
    const data = await getPageData({
        request,
        query: BLOG_QUERY,
    });

    if (!data?.page) {
        const redirect = await shouldRedirect(request);

        if (redirect) {
            return redirect;
        } else {
            throw new Response('Not found', { status: 404 });
        }
    }

    const { page: blog, isPreview }: PageData = data;

    const hubspotFormData = await getHubspotForms(blog);

    const canonicalUrl = buildCanonicalUrl({
        canonical: blog?.seo?.canonicalUrl,
        request,
    });

    return json({
        blog,
        isPreview,
        canonicalUrl,
        hubspotFormData: hubspotFormData ? hubspotFormData : null,
        query: isPreview ? BLOG_QUERY : null,
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
    return getComponentStyles(data.blog);
};

export const handle = { dynamicLinks };

export const meta: MetaFunction = ({ data, parentsData }) => {
    const globalSeoSettings = parentsData.root.siteSettings.seo;

    const meta = buildHtmlMetaTags({
        pageData: data.blog,
        globalData: globalSeoSettings,
        canonicalUrl: data.canonicalUrl,
    });

    return meta;
};

export default function Index() {
    const { blog, isPreview, query, params, token } = useLoaderData<typeof loader>();

    if (
        isPreview &&
        query &&
        params
        // && token
    ) {
        return (
            <>
                <PreviewBanner />
                <PreviewSuspense fallback={<PageContent {...blog} />}>
                    <PagePreview query={query} params={params} token={token} />
                </PreviewSuspense>
            </>
        );
    }

    return <PageContent {...blog} />;
}
