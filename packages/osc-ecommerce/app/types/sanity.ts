import type { PortableTextBlock } from '@portabletext/types';
import type { ImgHTMLAttributes } from 'react';

export interface SanityLinkItem {
    _type: string;
    _key: string;
    title: string;
}

export interface InternalSanityLinkItem extends SanityLinkItem {
    documentType?: string;
    slug?: string;
}

export interface ExternalSanityLinkItem extends SanityLinkItem {
    newWindow?: boolean;
    url?: string;
}

interface SanityImage<T> extends ImgHTMLAttributes<T> {
    _key?: string;
    _type?: string;
    height: number;
    src: string;
    width: number;
}

export interface imageModule<T> extends SanityImage<T> {
    alt: string;
    responsiveImages?: SanityImage<T>[] | undefined;
    className?: string;
    loading?: 'eager' | 'lazy';
    responsiveWidths?: number[];
    sizes?: string | undefined;
}

export interface module {
    _type?: string;
    _key?: string;
}

interface buttonModule extends module {
    _key: string;
    _type: string;
    externalLink?: {
        newWindow?: boolean;
        url?: string;
    };
    documentType?: string;
    file?: string;
    label: string;
    reference?: object;
    type: string;
    variant?:
        | 'primary'
        | 'secondary'
        | 'tertiary'
        | 'quaternary'
        | 'quinary'
        | 'septenary'
        | 'octonary';
    email?: string;
    slug?: string;
    telephone?: string;
    textToCopy?: string;
}

export interface contentModule extends module {
    backgroundColor?: 'primary' | 'secondary' | 'tertiary';
    horizontalAlignment?: 'left' | 'centre' | 'right';
    marginBottom?: 10 | 50 | 110 | 210;
    paddingBottom?: 10 | 50 | 110 | 210;
    paddingTop?: 10 | 50 | 110 | 210;
    textColor?: 'primary' | 'secondary' | 'tertiary';
    body?: PortableTextBlock[];
    buttons?: buttonModule[];
}

export interface accordionModule extends module {
    accordionHeadingLevels: 'string';
    accordionItem?: {
        _key: string;
        _type: string;
        content?: contentModule;
        defaultOpen?: boolean;
        heading: string;
    }[];
    content?: contentModule;
}

export interface mediaTextModule extends module {
    layout: 'media-left' | 'media-right';
    body?: PortableTextBlock;
    media?: SanityImage<HTMLImageElement>;
    links?: InternalSanityLinkItem[] | ExternalSanityLinkItem[];
}

export interface trustpilotModule extends module {
    height: string;
    stars: string;
    type: 'slider' | 'grid' | 'minicarousel' | 'microstar';
}

export interface carouselModule extends module {
    mediaArray: SanityImage<HTMLImageElement>[];
    active: boolean;
    delay: string;
    slidesPerPage: number;
    slideGap: number;
    axis: 'x' | 'y';
    height: string;
    loop: boolean;
    startIndex: number;
}

export interface SanityHero {
    image?: SanityImage<HTMLImageElement>;
    body: PortableTextBlock;
    links?: InternalSanityLinkItem[] | ExternalSanityLinkItem[] | null;
}

export interface SanitySEO {
    title?: string;
    description?: string | null;
    image: {
        dimensions: {
            height: string;
            width: string;
        };
        url: string;
    } | null;
    canonicalUrl?: string | null;
    robots?: {
        noIndex: boolean;
    };
}

export interface SanityGlobalSEO extends SanitySEO {
    siteTile: string;
    titleSeparator: string;
}

export interface SanityPage {
    _id: string;
    _rev: string;
    _type: string;
    title?: string;
    slug?:
        | {
              current: string;
          }
        | undefined;
    seo: SanitySEO;
    hero?: SanityHero;
    showHero?: boolean;
    modules: module[] | contentModule[];
    store?: {
        title: string;
        slug?: {
            current: string;
        };
    };
}

export interface shopifyProduct {
    id: string;
    title: string;
    handle: string;
    featuredImage?: {
        altText?: string | null;
        height: number;
        width: number;
        url: string;
    } | null;
    compareAtPriceRange: {
        minVariantPrice: {
            amount: string;
            currencyCode: string;
        };
    };
    priceRange: {
        minVariantPrice: {
            amount: string;
            currencyCode: string;
        };
    };
    options: {
        values: string[];
        name: string;
    }[];
}

export interface SanitySiteSetting {
    _id: 'settings';
    _rev: string;
    _type: 'settings';
    footer: {
        _type: 'settings.footer';
        links: InternalSanityLinkItem[] | ExternalSanityLinkItem[];
        text: PortableTextBlock;
    };
    menu: {
        links: InternalSanityLinkItem[] | ExternalSanityLinkItem[];
    };
    seo: SanitySEO;
}

export interface SanityRedirect {
    _id: string;
    source: string;
    statusCode: 301 | 302;
    destination: {
        _type: string;
        slug: string;
    };
}
