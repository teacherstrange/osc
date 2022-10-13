import type { PortableTextBlock } from '@portabletext/types';

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

export interface module {
    _type?: string;
    _key?: string;
}

export interface contentModule extends module {
    body?: PortableTextBlock;
}

export interface mediaTextModule extends module {
    layout: 'media-left' | 'media-right';
    body?: PortableTextBlock;
    media?: SanityImage;
    links?: InternalSanityLinkItem[] | ExternalSanityLinkItem[];
}

export interface SanityImage {
    asset: {
        url: string;
        altText: string | undefined;
    };
}

export interface SanityHero {
    image?: SanityImage;
    body: PortableTextBlock;
    links?: InternalSanityLinkItem[] | ExternalSanityLinkItem[] | null;
}

export interface SanitySEO {
    title: string;
    desciprion: string | null;
    image: SanityImage | null;
}

export interface SanityPage {
    _id: string;
    _rev: string;
    _type?: string;
    title?: string;
    slug?:
        | {
              current: string;
          }
        | undefined;
    seo: SanitySEO;
    hero: SanityHero;
    showHero: boolean;
    modules: module[] | mediaTextModule[];
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
