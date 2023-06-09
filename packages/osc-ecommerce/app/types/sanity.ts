import type { PortableTextBlock } from '@portabletext/types';
import type { Product as ProductType } from '@shopify/hydrogen/storefront-api-types';
import type { Maybe, Spacing, Themes } from 'osc-ui/src/types';
import type { ImgHTMLAttributes } from 'react';

export interface SanityLinkItem {
    _type: string;
    _key: string;
    title: string;
}

export interface SanityPageTheme {
    _type: string;
    color: string;
    pattern: string;
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
    responsiveImages: Maybe<SanityImage<T>[]>;
    className?: string;
    loading?: 'eager' | 'lazy';
    responsiveWidths?: number[];
    derived?: {
        secure_url?: string;
    }[];
    secure_url?: string;
    sizes?: string | undefined;
    imageStyles?: {
        overlayColor?: string;
        grayscale?: boolean;
        opacity?: boolean;
    };
    rowSettings?: rowSettings;
}

export interface module {
    _type?: Maybe<string>;
    _key?: Maybe<string>;
}

export interface rowSettings extends module {
    backgroundColor?: Maybe<Themes>;
    marginBottom?: Maybe<Spacing>;
    paddingBottom?: Maybe<Spacing>;
    paddingTop?: Maybe<Spacing>;
    container?: Maybe<'default' | 'full'>;
}

export interface buttonModule extends module {
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
        | 'primary-gradient'
        | 'secondary-gradient';
    email?: string;
    slug?: string;
    telephone?: string;
    textToCopy?: string;
    isInversed?: boolean;
    icon?: string;
}

export interface contentModule extends module {
    horizontalAlignment?: 'left' | 'centre' | 'right';
    fullWidth?: Maybe<boolean>;
    body?: PortableTextBlock[];
    buttons?: buttonModule[];
    rowSettings: rowSettings;
}

export interface contentMediaSlide extends module {
    content: contentModule;
    contentAlignment?: 'start' | 'center' | 'end';
    layoutDirection?: 'content-media' | 'media-content';
    layoutGrid?: string;
    media: {
        carouselName: Maybe<string>;
        carouselSettings: carouselModuleSettings;
        imageFit?: 'cover' | 'contain';
        mediaType: {
            _key?: string;
            _type?: string;
            formId?: string;
            formName?: string;
            imageFit?: 'cover' | 'contain';
            image?: imageModule<HTMLImageElement>;
        }[];
    };
}

export interface contentMediaModule extends module {
    carouselName: Maybe<string>;
    carouselSettings: Maybe<carouselModuleSettings>;
    marginBottom?: Maybe<Spacing>;
    paddingBottom?: Maybe<Spacing>;
    paddingTop?: Maybe<Spacing>;
    slides: contentMediaSlide[];
    rowSettings: rowSettings;
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
    rowSettings: rowSettings;
}

export interface videoModule extends module {
    videoUrl?: string;
    videoType?: 'youtube' | 'vimeo';
    videoSettings?: {
        autoplay?: boolean;
        loop?: boolean;
        preserveContent?: boolean;
    };
    videoImage?: imageModule<HTMLImageElement>;
    content?: contentModule;
    rowSettings: rowSettings;
}

export interface bioCardModule extends module {
    reference?: {
        _createdAt: string;
        _id: string;
        _rev: string;
        _type: 'team';
        _updatedAt: string;
        bio?: PortableTextBlock[];
        image?: {
            alt: string;
            image?: Omit<imageModule<HTMLImageElement>, 'alt' | 'src'>;
        };
        name?: string;
        role?: string;
    };
}

export interface courseCardModule extends module, ProductType {
    reference?: {
        _createdAt: string;
        _id: string;
        _rev: string;
        _type: 'product';
        _updatedAt: string;
        store?: shopifyProduct;
    };
}

export interface collectionCardModule extends module {
    reference: {
        _createdAt: string;
        _id: string;
        _rev: string;
        _type: 'collection';
        _updatedAt: string;
        store?: shopifyCollection;
        theme?: {
            color?: string;
        };
        featuredImage?: imageModule<HTMLImageElement>;
        slug: string;
    };
    variant?: 'sm' | 'md' | 'lg';
}

export interface postCardModule extends module {
    fullWidth?: boolean;
    backgroundColor?: string;
    reference: {
        _createdAt: string;
        _id: string;
        _rev: string;
        _type: 'post';
        _updatedAt: string;
        theme?: {
            color?: string;
        };
        modules?: {
            slides?: {
                backgroundColor?: string;
                titleColor?: string;
                image?: imageModule<HTMLImageElement>;
            };
        }[];
        slug: string;
        title?: string;
    };
}

export interface staticCardModule extends module {
    button?: buttonModule;
    content?: PortableTextBlock[];
    footer?: PortableTextBlock[];
    heading?: string;
    headingStyles?: {
        headingColor?: string;
        smallHeading?: boolean;
    };
    image?: {
        alt: string;
        image?: Omit<imageModule<HTMLImageElement>, 'alt' | 'src'>;
        imageStyles?: {
            overlayColor?: string;
            grayscale?: boolean;
            opacity?: boolean;
        };
    };
    showFooter?: boolean;
    showSubHeading?: boolean;
    subHeading?: string;
}

export type TypesOfCard =
    | bioCardModule
    | courseCardModule
    | collectionCardModule
    | postCardModule
    | staticCardModule;

export interface cardModule extends module {
    layout: string;
    carouselName?: Maybe<string>;
    carouselSettings?: carouselModuleSettings;
    content?: contentModule;
    card: TypesOfCard[];
    rowSettings: rowSettings;
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
    carouselName?: string;
    slides?: {
        image?: imageModule<HTMLImageElement>;
    }[];
    settings?: carouselModuleSettings;
    rowSettings: rowSettings;
}

export interface carouselModuleSettings extends module {
    carouselName: Maybe<string>;
    arrows?: boolean;
    dotNav?: boolean;
    loop?: boolean;
    autoplay?: false | 'smooth' | 'switch';
    startIndex?: number;
    slidesPerView?: {
        mobile?: number;
        tablet?: number;
        desktop?: number;
    };
}

export interface heroSlide extends module {
    title?: string;
    content: contentModule;
    image?: imageModule<HTMLImageElement>;
    backgroundColor?: string;
    titleColor?: string;
    variant: 'primary' | 'secondary' | 'tertiary';
    flourishes?: flourishSettings;
}

export interface heroModule extends module {
    carouselSettings: carouselModuleSettings;
    slides: heroSlide[];
}

export interface textGridModule extends module {
    items?: {
        _key: string;
        content?: contentModule;
        icon?: string;
    }[];
    heading?: string;
    hasInlineHeading?: boolean;
    rowSettings: rowSettings;
}

export interface tabsModule extends module {
    tabItem: {
        _key: string;
        _type: string;
        modules: module[] | contentModule[];
        title: string;
    }[];
    rowSettings: rowSettings;
}

export interface recommendedProductsModule extends module {
    numberOfProducts: number;
    heading?: string;
    carouselSettings?: carouselModuleSettings;
    rowSettings: rowSettings;
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
    socials: SanitySocial[];
}

export interface SanitySocial {
    _key: string;
    _type: string;
    socialProfile: string;
    icon: string;
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
    modules: module[] | contentModule[];
    store?: {
        title: string;
        slug?: {
            current: string;
        };
    };
}

export interface SanityProduct extends SanityPage {
    gid: string;
    upperContent: module[] | contentModule[];
    theme?: SanityPageTheme;
}

export interface SanityProductExcerpt {
    description: {
        body: PortableTextBlock;
    };
}

export interface SanityProductExcerpt {
    description: {
        body: PortableTextBlock;
    };
}

export interface shopifyProduct {
    id?: string | number;
    title?: string;
    descriptionHtml?: string;
    slug?: {
        current?: string;
    };
    featuredImage?: {
        altText?: string | null;
        height?: number;
        width?: number;
        url?: string;
    } | null;
    compareAtPriceRange?: {
        minVariantPrice?: {
            amount?: string;
            currencyCode?: string;
        };
    };
    priceRange?: {
        minVariantPrice?:
            | number
            | {
                  amount?: string;
                  currencyCode?: string;
              };
    };
    options?: {
        _key?: string;
        values?: string[];
        name?: string;
    }[];
}

export interface shopifyCollection {
    id: string | number;
    title: string;
    descriptionHtml: string;
    slug: {
        current: string;
    };
    featuredImage?: {
        altText?: string | null;
        height: number;
        width: number;
        url: string;
    } | null;
}

export interface SanitySiteSetting {
    _id: 'settings';
    _rev: string;
    _type: 'settings';
    footer: {
        footerBottomNav: string;
        footerNavigation: string;
    };
    mainNavigationId: string;
    seo: SanitySEO;
}

export interface SanityContactDetails {
    email?: string;
    phoneNumber?: string;
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

export interface SanityNavSettings {
    _id: string;
    _type: string;
    navigationId: string;
    navigationItem: SanityNavItem[];
    title?: string;
}

export interface SanityNavItem extends module {
    _type?: 'column' | 'feature';
    navigationLabel: string;
    internalLink?: {
        title: string;
        slug: string;
    };
    externalLink?: string;
    target?: 'Internal' | 'External' | 'Trigger';
    featured?: Maybe<SanityNavItem[]>;
    items?: Maybe<SanityNavItem[]>;
}

export interface SanityActionNavSettings {
    account: {
        icon: string;
        label: string;
        link: {
            slug: string;
        };
    };
    cart: {
        icon: string;
        label: string;
    };
    search: {
        icon: string;
        label: string;
    };
    wishlist: {
        icon: string;
        label: string;
        link: {
            slug: string;
        };
    };
}

export interface formModule extends module {
    formId: string;
    formName: string;
    rowSettings: rowSettings;
}

export interface PreviewProps {
    query: string;
    params: { [key: string]: string };
    token: string | null;
}

export interface flourishSettings extends module {
    color: string | 'multicolor';
    pattern: Maybe<
        | 'flourishPrimary'
        | 'flourishSecondary'
        | 'flourishHeroPrimary'
        | 'flourishHeroSecondary'
        | 'flourishHeroTertiary'
        | 'flourishCollectionPrimary'
        | 'flourishCollectionSecondary'
        | 'flourishCollectionTertiary'
        | 'flourishCollectionQuaternary'
        | 'flourishCollectionQuinary'
    >;
}
