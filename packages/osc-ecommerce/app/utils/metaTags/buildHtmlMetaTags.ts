import type { HtmlMetaDescriptor } from '@remix-run/node';
import type { SanityGlobalSEO, SanityPage } from '~/types/sanity';

interface Props {
    pageData: SanityPage;
    globalData: SanityGlobalSEO;
    canonicalUrl?: string;
}

export function buildHtmlMetaTags({ pageData, globalData, canonicalUrl }: Props) {
    const isShopifyData = pageData.store ? true : false;
    const noindex = pageData?.seo?.robots?.noIndex ? 'noindex' : '';
    let title;

    if (isShopifyData && !pageData.seo.title) {
        title = pageData?.store?.title;
    } else if (pageData.seo.title) {
        title = pageData?.seo?.title;
    } else {
        title = pageData?.title;
    }

    const description = pageData?.seo?.description;
    const image = pageData?.seo?.image;

    const meta: HtmlMetaDescriptor = {
        title: `${title} ${globalData.titleSeparator} ${globalData.siteTile}`,
        description,
        'og:url': canonicalUrl,
        'og:image': image?.url,
        'og:image:width': image?.dimensions?.width,
        'og:image:height': image?.dimensions?.height
    };

    // Adding properties like this let's us keep the defaults set in root.tsx
    if (noindex) {
        meta['robots'] = noindex;
    }

    return meta;
}
