import type { MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useParams } from '@remix-run/react';
import type {
    Product as ProductType,
    ProductVariant,
} from '@shopify/hydrogen/storefront-api-types';
import type { LoaderArgs } from '@shopify/remix-oxygen';
import { useState } from 'react';
import type { DynamicLinksFunction } from 'remix-utils';
import invariant from 'tiny-invariant';
import Module, { getComponentStyles } from '~/components/Module';
import Preview from '~/components/Preview';
import getPageData, { shouldRedirect } from '~/models/sanity.server';
import { PRODUCT_QUERY as SANITY_PRODUCT_QUERY } from '~/queries/sanity/product';
import { PRODUCT_QUERY as SHOPIFY_PRODUCT_QUERY } from '~/queries/shopify/product';
import type { SanityPage, module } from '~/types/sanity';
import { getHubspotForms } from '~/utils/hubspot.helpers';
import { buildCanonicalUrl } from '~/utils/metaTags/buildCanonicalUrl';
import { buildHtmlMetaTags } from '~/utils/metaTags/buildHtmlMetaTags';

interface PageData {
    page: SanityPage;
    isPreview: boolean;
}

export const loader = async ({ request, params, context }: LoaderArgs) => {
    const { slug } = params;
    const { storefront } = context;

    invariant(slug, 'Missing slug param');

    const { product } = await storefront.query<{
        product: ProductType & { selectedVariant?: ProductVariant };
    }>(SHOPIFY_PRODUCT_QUERY, {
        variables: {
            handle: slug,
            country: storefront.i18n?.country,
            language: storefront.i18n?.language,
        },
    });

    // Query the page data
    const data = await getPageData({
        request,
        params,
        query: SANITY_PRODUCT_QUERY,
    });

    if (!product || !data?.page) {
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
        product,
        isPreview,
        canonicalUrl,
        hubspotFormData: hubspotFormData ? hubspotFormData : null,
        query: isPreview ? SANITY_PRODUCT_QUERY : null,
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
    const { page, product, isPreview, query } = useLoaderData<typeof loader>();
    const params = useParams();

    // If `preview` mode is active, its component updates this state for us
    const [data, setData] = useState<SanityPage>(page);

    // Make sure to update the page state if the IDs are different!
    if (page?._id !== data?._id) setData(page);

    /**
     * NOTE: For preview mode to work when working with draft content, optionally chain _everything_
     */
    return (
        <>
            {isPreview && query ? (
                <Preview data={data} setData={setData} query={query} queryParams={params} />
            ) : null}

            <h1>{product.title}</h1>

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
