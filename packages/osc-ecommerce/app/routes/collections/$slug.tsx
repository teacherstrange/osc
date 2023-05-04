import type { LoaderArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { PreviewSuspense } from '@sanity/preview-kit';
import type { Collection as CollectionType } from '@shopify/hydrogen/storefront-api-types';
import { lazy } from 'react';
import type { DynamicLinksFunction } from 'remix-utils';
import invariant from 'tiny-invariant';
import { getComponentStyles } from '~/components/Module';
import { PageContent } from '~/components/PageContent';
import { PreviewBanner } from '~/components/PreviewBanner';
import { PATHS } from '~/constants';
import getPageData, { shouldRedirect } from '~/models/sanity.server';
import { COLLECTION_QUERY as SANITY_COLLECTION_QUERY } from '~/queries/sanity/collection';
import { COLLECTION_QUERY as SHOPIFY_COLLECTION_QUERY } from '~/queries/shopify/collection';
import type { SanityPage } from '~/types/sanity';
import { getHubspotForms } from '~/utils/hubspot.helpers';
import { buildCanonicalUrl } from '~/utils/metaTags/buildCanonicalUrl';
import { buildHtmlMetaTags } from '~/utils/metaTags/buildHtmlMetaTags';

const PagePreview = lazy(() => import('~/components/PagePreview'));

interface PageData {
    page: SanityPage;
    isPreview: boolean;
}

export const loader = async ({ request, params, context }: LoaderArgs) => {
    const { slug } = params;
    const { storefront } = context;

    invariant(slug, 'Missing slug param');

    const { collection } = await storefront.query<{
        collection: CollectionType;
    }>(SHOPIFY_COLLECTION_QUERY, {
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
        query: SANITY_COLLECTION_QUERY,
    });

    if (!collection || !data?.page) {
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
        collection,
        isPreview,
        canonicalUrl,
        hubspotFormData: hubspotFormData ? hubspotFormData : null,
        query: isPreview ? SANITY_COLLECTION_QUERY : null,
        params: isPreview ? params : null,
    });
};

// https://github.com/sergiodxa/remix-utils#dynamiclinks
const dynamicLinks: DynamicLinksFunction = ({ data }) => {
    return getComponentStyles(data.collection);
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

export default function Collection() {
    const { page, collection, isPreview, query, params } = useLoaderData<typeof loader>();
    const isPreviewMode = isPreview && query && params;

    return (
        <>
            {isPreviewMode ? <PreviewBanner /> : null}

            <h1>{collection.title}</h1>

            {collection.products.nodes.length > 0
                ? collection.products.nodes.map((product) => (
                      <div key={product.id}>
                          <Link to={`/${PATHS.PRODUCTS}/${product.handle}`}>{product.title}</Link>
                      </div>
                  ))
                : null}

            {isPreviewMode ? (
                <PreviewSuspense fallback={<PageContent {...page} />}>
                    <PagePreview query={query} params={params} Component={PageContent} />
                </PreviewSuspense>
            ) : (
                <PageContent {...page} />
            )}
        </>
    );
}
