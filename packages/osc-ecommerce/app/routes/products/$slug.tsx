import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useParams } from '@remix-run/react';
import { useState } from 'react';
import type { DynamicLinksFunction } from 'remix-utils';
import Module, { getComponentStyles } from '~/components/Module';
import Preview from '~/components/Preview';
import getPageData, { shouldRedirect } from '~/models/sanity.server';
import { PRODUCT_QUERY } from '~/queries/sanity/product';
import type { module, SanityPage } from '~/types/sanity';
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
        query: PRODUCT_QUERY
    });

    if (!data?.page) {
        const redirect = await shouldRedirect(request);

        if (redirect) {
            return redirect;
        } else {
            throw new Response('Not found', { status: 404 });
        }
    }

    const { page: product, isPreview }: PageData = data;
    const canonicalUrl = buildCanonicalUrl({
        canonical: product?.seo?.canonicalUrl,
        request
    });

    return json({
        product,
        isPreview,
        canonicalUrl,
        query: isPreview ? PRODUCT_QUERY : null
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
        pageData: data.product,
        globalData: globalSeoSettings,
        canonicalUrl: data.canonicalUrl
    });

    return meta;
};

export default function Index() {
    const { product, isPreview, query } = useLoaderData<typeof loader>();
    const params = useParams();

    // If `preview` mode is active, its component updates this state for us
    const [data, setData] = useState<SanityPage>(product);

    // Make sure to update the page state if the IDs are different!
    if (product?._id !== data?._id) setData(product);

    /**
     * NOTE: For preview mode to work when working with draft content, optionally chain _everything_
     */
    return (
        <>
            {isPreview ? (
                <Preview data={data} setData={setData} query={query} queryParams={params} />
            ) : null}

            <h1>{data?.store?.title}</h1>

            {data?.modules && data?.modules.length > 0 ? (
                <>
                    {data?.modules.map((module: module) =>
                        module ? <Module key={module?._key} module={module} /> : null
                    )}
                </>
            ) : null}
        </>
    );
}
