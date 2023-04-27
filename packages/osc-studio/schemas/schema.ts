import type { SchemaTypeDefinition } from 'sanity';
// First, we must import the schema creator
// Then import schema types from any plugins that might expose them

// Rich text annotations used in the block content editor
import annotationLinkEmail from './annotations/linkEmail';
import annotationLinkExternal from './annotations/linkExternal';
import annotationLinkInternal from './annotations/linkInternal';

// Document types
import awardingBody from './documents/awardingBody';
import awardingBodyPages from './documents/awardingBodyPages';
import collection from './documents/collection';
import faqs from './documents/faqs';
import navigation from './documents/navigation';
import page from './documents/page';
import post from './documents/post';
import product from './documents/product';
import productVariant from './documents/productVariant';
import redirects from './documents/redirects';
import team from './documents/team';
import testimonials from './documents/testimonials';

// Singleton document types
import blog from './singletons/blog';
import home from './singletons/home';
import settings from './singletons/settings';

// Block content
import body from './blocks/body';

// Object types
import bodyNoHeadings from './blocks/bodyNoHeadings';
import accordionItem from './objects/accordionItem';
import carouselSettings from './objects/carouselSettings';
import collectionRule from './objects/collectionRule';
import contentMediaImage from './objects/contentMediaImage';
import contentMediaSlide from './objects/contentMediaSlide';
import heroSlide from './objects/heroSlide';
import linkExternal from './objects/linkExternal';
import linkInternal from './objects/linkInternal';
import moduleAccordion from './objects/module/accordion';
import moduleButton from './objects/module/button';
import moduleButtons from './objects/module/buttons';
import moduleCardBio from './objects/module/cardBio';
import moduleCardCollection from './objects/module/cardCollection';
import moduleCardCourse from './objects/module/cardCourse';
import moduleCardPost from './objects/module/cardPost';
import moduleCardStatic from './objects/module/cardStatic';
import moduleCards from './objects/module/cards';
import moduleCarousel from './objects/module/carousel';
import moduleContent from './objects/module/content';
import moduleContentMedia from './objects/module/contentMedia';
import moduleForms from './objects/module/forms';
import moduleHero from './objects/module/hero';
import moduleImage from './objects/module/image';
import moduleImageMobile from './objects/module/imageMobile';
import moduleImageTablet from './objects/module/imageTablet';
import moduleImages from './objects/module/images';
import moduleTabs from './objects/module/tabs';
import moduleTextGrid from './objects/module/textGrid';
import moduleTrustpilot from './objects/module/trustpilot';
import moduleVideo from './objects/module/video';
import navigationItem from './objects/navigationItem';
import navigationLink from './objects/navigationLink';
import partialCarouselSettings from './objects/partialCarouselSettings';
import placeholderString from './objects/placeholderString';
import productOption from './objects/productOption';
import ProductWithVariant from './objects/productWithVariant';
import proxyString from './objects/proxyString';
import seoHome from './objects/seo/home';
import seoPage from './objects/seo/page';
import seoShopify from './objects/seo/shopify';
import shopifyCollection from './objects/shopifyCollection';
import shopifyProduct from './objects/shopifyProduct';
import shopifyProductVariant from './objects/shopifyProductVariant';
import social from './objects/social';
import tabItem from './objects/tabItem';
import textGridItem from './objects/textGridItem';

// Build the schemas and export to the Sanity Studio app
export const schemaTypes: SchemaTypeDefinition[] = [
    // Annotations
    annotationLinkEmail,
    annotationLinkExternal,
    annotationLinkInternal,

    // Document types
    awardingBody,
    awardingBodyPages,
    collection,
    faqs,
    navigation,
    page,
    post,
    product,
    productVariant,
    redirects,
    team,
    testimonials,

    // Singleton document types
    home,
    blog,
    settings,

    // Block content
    body,
    bodyNoHeadings,

    // Objects
    accordionItem,
    tabItem,
    carouselSettings,
    contentMediaImage,
    contentMediaSlide,
    partialCarouselSettings,
    heroSlide,
    collectionRule,
    textGridItem,
    linkExternal,
    linkInternal,
    navigationItem,
    navigationLink,
    placeholderString,
    productOption,
    ProductWithVariant,
    proxyString,
    seoHome,
    seoPage,
    seoShopify,
    social,
    shopifyCollection,
    shopifyProduct,
    shopifyProductVariant,
    moduleButton,
    moduleButtons,
    moduleAccordion,
    moduleCardBio,
    moduleCardCourse,
    moduleCardCollection,
    moduleCardPost,
    moduleCardStatic,
    moduleCards,
    moduleContent,
    moduleContentMedia,
    moduleForms,
    moduleHero,
    moduleImage,
    moduleImages,
    moduleImageMobile,
    moduleImageTablet,
    moduleTabs,
    moduleTrustpilot,
    moduleCarousel,
    moduleTextGrid,
    moduleVideo,
];
