import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { DynamicLinksFunction } from 'remix-utils';
import Module, { getComponentStyles } from '~/components/Module';
import getPageData, { shouldRedirect } from '~/models/sanity.server';
import { PAGE_QUERY } from '~/queries/sanity/page';
import type { SanityPage, module } from '~/types/sanity';
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
        query: isPreview ? PAGE_QUERY : null,
        hubspotFormData: hubspotFormData ? hubspotFormData : null,
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
    const { page, isPreview } = useLoaderData<typeof loader>();

    return (
        <>
            {isPreview ? <div>Preview Mode</div> : null}

            {page?.modules && page?.modules.length > 0 ? (
                <>
                    {page?.modules.map((module: module) =>
                        module ? <Module key={module?._key} module={module} /> : null
                    )}
                </>
            ) : null}
        </>
    );
}
