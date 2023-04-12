import type { PortableTextBlock } from '@portabletext/types';
import type { Maybe, Spacing, Themes } from 'osc-ui/src/types';
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
    responsiveImages: Maybe<SanityImage<T>[]>;
    className?: string;
    loading?: 'eager' | 'lazy';
    responsiveWidths?: number[];
    derived?: {
        secure_url?: string;
    }[];
    secure_url?: string;
    sizes?: string | undefined;
}

export interface module {
    _type?: Maybe<string>;
    _key?: Maybe<string>;
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
    backgroundColor?: Maybe<Themes>;
    horizontalAlignment?: 'left' | 'centre' | 'right';
    marginBottom?: Maybe<Spacing>;
    paddingBottom?: Maybe<Spacing>;
    paddingTop?: Maybe<Spacing>;
    paddingLeft: Maybe<Spacing>;
    paddingRight: Maybe<Spacing>;
    fullWidth?: Maybe<boolean>;
    body?: PortableTextBlock[];
    buttons?: buttonModule[];
}

export interface contentMediaSlide extends module {
    content: contentModule;
    contentAlignment?: 'start' | 'center' | 'end';
    layoutDirection?: 'content-media' | 'media-content';
    layoutGrid?: string;
    media: {
        carouselName: Maybe<string>;
        carouselSettings: carouselModuleSettings;
        mediaType: {
            image?: imageModule<HTMLImageElement>;
            imageFit?: 'cover' | 'contain';
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
}

export interface bioCardModule extends module {
    reference?: {
        bio?: PortableTextBlock[];
        image?: {
            alt: string;
            image?: Omit<imageModule<HTMLImageElement>, 'alt' | 'src'>;
        };
        name?: string;
        role?: string;
    };
}

export interface courseCardModule extends module {
    reference?: {
        _createdAt: string;
        _id: string;
        _rev: string;
        _type: string;
        _updatedAt: string;
        store?: shopifyProduct;
    };
}

export interface collectionCardModule extends module {
    reference?: {
        store?: shopifyCollection;
    };
    variant?: 'sm' | 'md' | 'lg';
}

export interface postCardModule extends module {
    fullWidth?: boolean;
    backgroundColor?: string;
    reference?: {
        slug?: {
            current: string;
        };
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
    backgroundColor?: Themes | string;
    marginBottom?: Spacing | string;
    paddingBottom?: Spacing | string;
    paddingTop?: Spacing | string;
    layout: string;
    carouselName?: Maybe<string>;
    carouselSettings?: carouselModuleSettings;
    content?: contentModule;
    card: TypesOfCard[];
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
}

export interface heroModule extends module {
    carouselName: string;
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
    marginBottom: Spacing;
    paddingBottom: Spacing;
    paddingTop: Spacing;
}

export interface tabsModule extends module {
    marginBottom?: Maybe<Spacing>;
    paddingBottom?: Maybe<Spacing>;
    paddingTop?: Maybe<Spacing>;
    paddingLeft: Maybe<Spacing>;
    paddingRight: Maybe<Spacing>;
    tabItem: {
        _key: string;
        _type: string;
        modules: module[] | contentModule[];
        title: string;
    }[];
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
    showHero?: boolean;
    modules: module[] | contentModule[];
    store?: {
        title: string;
        slug?: {
            current: string;
        };
    };
}

export interface SanityProduct extends SanityPage {
    upperContent?: module[] | contentModule[];
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
    formNameAndId: string;
    formId: string;
    formName: string;
    marginBottom?: Maybe<Spacing>;
    paddingBottom?: Maybe<Spacing>;
    paddingTop?: Maybe<Spacing>;
}
