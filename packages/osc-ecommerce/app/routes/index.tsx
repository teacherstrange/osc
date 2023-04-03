import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { DynamicLinksFunction } from 'remix-utils';
import Module, { getComponentStyles } from '~/components/Module';
import getPageData from '~/models/sanity.server';
import { HOME_QUERY } from '~/queries/sanity/home';
import type { SanityPage, module } from '~/types/sanity';
import { getHubspotForms } from '~/utils/hubspot.helpers';
import { buildCanonicalUrl } from '~/utils/metaTags/buildCanonicalUrl';
import { buildHtmlMetaTags } from '~/utils/metaTags/buildHtmlMetaTags';

interface PageData {
    page: SanityPage;
    isPreview: boolean;
}

export const loader: LoaderFunction = async ({ request }) => {
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
    const { home, isPreview } = useLoaderData<typeof loader>();

    return (
        <>
            {isPreview ? <div>Preview Mode</div> : null}

            {home?.modules && home?.modules.length > 0 ? (
                <>
                    {home?.modules.map((module: module) =>
                        module ? <Module key={module?._key} module={module} /> : null
                    )}
                </>
            ) : null}
        </>
    );
}
