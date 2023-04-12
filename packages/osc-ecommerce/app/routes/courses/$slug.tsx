import type { MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useParams, useSearchParams } from '@remix-run/react';
import { Money } from '@shopify/hydrogen';
import type {
    Product as ProductType,
    ProductVariant,
} from '@shopify/hydrogen/storefront-api-types';
import type { LinksFunction, LoaderArgs } from '@shopify/remix-oxygen';
import { Button, ButtonGroup, Icon, RadioGroup, RadioItem } from 'osc-ui';
import { useMemo, useState, useTransition } from 'react';
import type { DynamicLinksFunction } from 'remix-utils';
import invariant from 'tiny-invariant';
// import { ProductForm } from '~/components/Forms/ProductForm/ProductForm';
import buttonStyles from 'osc-ui/dist/src-components-Button-button.css';
import radioStyles from 'osc-ui/dist/src-components-RadioGroup-radio-group.css';
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

interface PageData {
    page: SanityProduct;
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
                <div className="o-grid__col o-grid__col--12 o-grid__col--9@tab o-grid__col--8@desk-med">
                    <h1 className="t-font-secondary t-font-6xl u-b-bottom u-w-fit">
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

            <div className="o-container o-container--flush-r o-grid u-mb-6xl">
                {data?.upperContent && data?.upperContent.length > 0 ? (
                    // TODO: Temporary grid positions -- change these
                    <div className="o-grid__col o-grid__col--12 o-grid__col--7@tab o-grid__col--7@desk-med o-grid__col--7@desk-lrg">
                        {data?.upperContent.map((module: module) =>
                            module ? <Module key={module?._key} module={module} isFlush /> : null
                        )}
                    </div>
                ) : null}
                <div className="o-grid__col o-grid__col--start-8 o-grid__col--5">
                    <ProductForm />
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

export const ProductForm = () => {
    const { product } = useLoaderData<typeof loader>();

    const [currentSearchParams] = useSearchParams();
    const transition = useTransition();

    /**
     * We update `searchParams` with in-flight request data from `transition` (if available)
     * to create an optimistic UI, e.g. check the product option before the
     * request has completed.
     */
    const searchParams = useMemo(() => {
        return transition.location
            ? new URLSearchParams(transition.location.search)
            : currentSearchParams;
    }, [currentSearchParams, transition]);

    const firstVariant = product.variants.nodes[0];

    /**
     * We're making an explicit choice here to display the product options
     * UI with a default variant, rather than wait for the user to select
     * options first.
     * By default, the first variant's options are used.
     */
    // TODO: Hook this up
    const searchParamsWithDefaults = useMemo<URLSearchParams>(() => {
        const clonedParams = new URLSearchParams(searchParams);

        for (const { name, value } of firstVariant.selectedOptions) {
            if (!searchParams.has(name)) {
                clonedParams.set(name, value);
            }
        }

        return clonedParams;
    }, [searchParams, firstVariant.selectedOptions]);

    /**
     * Likewise, we're defaulting to the first variant for purposes
     * of add to cart if there is none returned from the loader.
     */
    const selectedVariant = product.selectedVariant ?? firstVariant;
    const isOutOfStock = !selectedVariant?.availableForSale;

    const isOnSale =
        selectedVariant?.price?.amount &&
        selectedVariant?.compareAtPrice?.amount &&
        selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;

    const courseOptions =
        product.options &&
        product.options.length > 0 &&
        product.options.filter((option) => option.name === 'Format')[0];

    const studyOptions =
        product.options &&
        product.options.length > 0 &&
        product.options.filter((option) => option.name === 'Study-method')[0];

    return (
        <div className="c-product-form">
            <h2 className="t-font-l u-text-bold">Course Options</h2>
            <p>Please choose a course option to see prices</p>
            {courseOptions ? (
                <RadioGroup
                    description={{ id: 'course-options', value: 'Course Options' }}
                    name="course-options"
                >
                    {courseOptions.values.map((value, index) => (
                        <RadioItem key={index} id={value} name={value} value={value} />
                    ))}
                </RadioGroup>
            ) : null}

            <h2 className="t-font-l u-text-bold">Study Options</h2>
            {studyOptions ? (
                <RadioGroup
                    description={{ id: 'course-options', value: 'Course Options' }}
                    name="course-options"
                >
                    {studyOptions.values.map((value, index) => (
                        <RadioItem key={index} id={value} name={value} value={value} />
                    ))}
                </RadioGroup>
            ) : null}

            <div className="o-flex o-flex--between">
                <Button variant="tertiary">
                    Save for later <Icon id="heart" />
                </Button>

                <div className="o-flex o-flex--stacked">
                    <Money
                        withoutTrailingZeros
                        data={selectedVariant?.price!}
                        as="span"
                        className="o-price u-color-primary t-font-l u-text-bold"
                    />
                    {isOnSale ? (
                        <Money
                            withoutTrailingZeros
                            data={selectedVariant?.compareAtPrice!}
                            as="span"
                        />
                    ) : null}
                    <span>Course code: {selectedVariant.sku}</span>
                </div>
            </div>

            <ButtonGroup direction="column">
                {isOutOfStock ? <></> : <Button isFull>Add to bag</Button>}

                <Button variant="tertiary" isFull>
                    Request a callback
                </Button>
            </ButtonGroup>
        </div>
    );
};
