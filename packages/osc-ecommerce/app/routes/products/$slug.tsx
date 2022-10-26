import { useLoaderData, useParams } from '@remix-run/react';
import { Heading, Stack } from '@chakra-ui/react';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useState } from 'react';

import Preview from '~/components/Preview';
import getPageData from '~/models/sanity.server';
import { PRODUCT_QUERY } from '~/queries/sanity/product';
import type { SanityPage } from '~/types/sanity';
import Module from '~/components/Module';
import type { module } from '~/types/sanity';
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

    if (!data) {
        throw new Response('`data` is not defined', { status: 500 });
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
        <div>
            TEST!
            {isPreview ? (
                <Preview data={data} setData={setData} query={query} queryParams={params} />
            ) : null}
            <Heading as="h1">{data?.store?.title}</Heading>
            {data?.modules && data?.modules.length > 0 ? (
                <Stack spacing={16}>
                    {data?.modules.map((module: module) =>
                        module ? <Module key={module?._key} module={module} /> : null
                    )}
                </Stack>
            ) : null}
        </div>
    );
}
