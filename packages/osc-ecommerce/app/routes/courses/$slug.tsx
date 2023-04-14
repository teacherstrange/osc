import type { MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useParams } from '@remix-run/react';
import type {
    Product as ProductType,
    ProductVariant,
    SelectedOptionInput,
} from '@shopify/hydrogen/storefront-api-types';
import type { LinksFunction, LoaderArgs } from '@shopify/remix-oxygen';
import buttonStyles from 'osc-ui/dist/src-components-Button-button.css';
import radioStyles from 'osc-ui/dist/src-components-RadioGroup-radio-group.css';
import { useState } from 'react';
import type { DynamicLinksFunction } from 'remix-utils';
import invariant from 'tiny-invariant';
import { ProductForm } from '~/components/Forms/ProductForm/ProductForm';
import Module, { getComponentStyles } from '~/components/Module';
import Preview from '~/components/Preview';
import getPageData, { shouldRedirect } from '~/models/sanity.server';
import { PRODUCT_QUERY as SANITY_PRODUCT_QUERY } from '~/queries/sanity/product';
import { PRODUCT_QUERY as SHOPIFY_PRODUCT_QUERY } from '~/queries/shopify/product';
import styles from '~/styles/dest/main.css';
import type { SanityProduct, module } from '~/types/sanity';
import { getUniqueObjects } from '~/utils/getUniqueObjects';
import { getHubspotForms } from '~/utils/hubspot.helpers';
import { buildCanonicalUrl } from '~/utils/metaTags/buildCanonicalUrl';
import { buildHtmlMetaTags } from '~/utils/metaTags/buildHtmlMetaTags';

export const links: LinksFunction = () => {
    return [
        { rel: 'stylesheet', href: styles },
        { rel: 'stylesheet', href: buttonStyles },
        { rel: 'stylesheet', href: radioStyles },
    ];
};

// TODO: Hook up SEO settings
// TODO: Hook up Shopify analytics

interface PageData {
    page: SanityProduct;
    isPreview: boolean;
}

export const loader = async ({ request, params, context }: LoaderArgs) => {
    const { slug } = params;
    const { storefront } = context;

    invariant(slug, 'Missing slug param');

    const searchParams = new URL(request.url).searchParams;

    const selectedOptions: SelectedOptionInput[] = [];
    searchParams.forEach((value, name) => {
        selectedOptions.push({ name, value });
    });

    const { product } = await storefront.query<{
        product: ProductType & { selectedVariant?: ProductVariant };
    }>(SHOPIFY_PRODUCT_QUERY, {
        variables: {
            handle: slug,
            selectedOptions,
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
    const [data, setData] = useState<SanityProduct>(page);

    // Make sure to update the page state if the IDs are different!
    if (page?._id !== data?._id) setData(page);

    // Due how the data is setup in Shopify there are times where we might return the same SKU multiple times
    // Here we are checking if there are any SKUs and then filtering out duplicates
    const uniqueSKUs =
        product?.variants?.nodes &&
        product?.variants?.nodes.length > 0 &&
        (getUniqueObjects(product.variants.nodes, 'sku') as typeof product.variants.nodes);

    /**
     * NOTE: For preview mode to work when working with draft content, optionally chain _everything_
     */
    return (
        <div className="u-pt-l">
            {isPreview && query ? (
                <Preview data={data} setData={setData} query={query} queryParams={params} />
            ) : null}

            <div className="o-container o-grid u-mb-l">
                <div className="o-grid__col o-grid__col--12 o-grid__col--9@tab o-grid__col--7@desk-med">
                    <h1 className="o-product-title t-font-secondary u-b-bottom u-w-fit">
                        {product.title}
                    </h1>

                    {uniqueSKUs
                        ? uniqueSKUs.map((variant: ProductVariant, index, { length }) => (
                              <span className="t-font-m" key={variant.id}>
                                  {variant.sku}
                                  {/* IF index isn't equal to the length of the array then add a / */}
                                  {length !== index + 1 && ' / '}
                              </span>
                          ))
                        : null}
                </div>
            </div>

            <div className="o-container o-grid u-mb-6xl">
                {data?.upperContent && data?.upperContent.length > 0 ? (
                    <div className="o-grid__col o-grid__col--12 o-grid__col--6@tab o-grid__col--7@desk-med">
                        {data?.upperContent.map((module: module) =>
                            module ? <Module key={module?._key} module={module} isFlush /> : null
                        )}
                    </div>
                ) : null}

                <div className="c-product-form__container o-grid__col o-grid__col--12 o-grid__col--start-8@tab o-grid__col--6@tab o-grid__col--start-7@desk o-grid__col--start-8@desk-med">
                    <ProductForm product={product} />
                </div>
            </div>

            {data?.modules && data?.modules.length > 0 ? (
                <>
                    {data?.modules.map((module: module) =>
                        module ? <Module key={module?._key} module={module} /> : null
                    )}
                </>
            ) : null}
        </div>
    );
}
