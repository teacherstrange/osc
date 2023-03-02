// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Rich text annotations used in the block content editor
import annotationLinkEmail from './annotations/linkEmail';
import annotationLinkExternal from './annotations/linkExternal';
import annotationLinkInternal from './annotations/linkInternal';

// Document types
import collection from './documents/collection';
import navigation from './documents/navigation';
import page from './documents/page';
import post from './documents/post';
import product from './documents/product';
import productVariant from './documents/productVariant';
import redirects from './documents/redirects';
import team from './documents/team';

// Singleton document types
import blog from './singletons/blog';
import home from './singletons/home';
import settings from './singletons/settings';

// Block content
import body from './blocks/body';

// Object types
import bodyNoHeadings from './blocks/bodyNoHeadings';
import accordionItem from './objects/accordionItem';
import collectionRule from './objects/collectionRule';
import linkExternal from './objects/linkExternal';
import linkInternal from './objects/linkInternal';
import moduleAccordion from './objects/module/accordion';
import moduleButton from './objects/module/button';
import moduleButtons from './objects/module/buttons';
import moduleCardBio from './objects/module/cardBio';
import moduleCardCollection from './objects/module/cardCollection';
import moduleCardCourse from './objects/module/cardCourse';
import moduleCardPost from './objects/module/cardPost';
import moduleCards from './objects/module/cards';
import moduleCardStatic from './objects/module/cardStatic';
import moduleCarousel from './objects/module/carousel';
import moduleContent from './objects/module/content';
import moduleImage from './objects/module/image';
import moduleImageMobile from './objects/module/imageMobile';
import moduleImages from './objects/module/images';
import moduleImageTablet from './objects/module/imageTablet';
import moduleTrustpilot from './objects/module/trustpilot';
import moduleVideo from './objects/module/video';
import navigationItem from './objects/navigationItem';
import navigationLink from './objects/navigationLink';
import placeholderString from './objects/placeholderString';
import productOption from './objects/productOption';
import productWithVariant from './objects/productWithVariant';
import proxyString from './objects/proxyString';
import seoHome from './objects/seo/home';
import seoPage from './objects/seo/page';
import seoShopify from './objects/seo/shopify';
import shopifyCollection from './objects/shopifyCollection';
import shopifyProduct from './objects/shopifyProduct';
import shopifyProductVariant from './objects/shopifyProductVariant';

// Build the schemas and export to the Sanity Studio app
export default createSchema({
    // We name our schema
    name: 'default',
    // Then proceed to concatenate our document type
    // to the ones provided by any plugins that are installed
    types: schemaTypes.concat([
        // Annotations
        annotationLinkEmail,
        annotationLinkExternal,
        annotationLinkInternal,
        // Document types
        collection,
        navigation,
        page,
        post,
        product,
        productVariant,
        redirects,
        team,
        // Singleton document types
        home,
        blog,
        settings,
        // Block content
        body,
        bodyNoHeadings,
        // Objects
        accordionItem,
        collectionRule,
        linkExternal,
        linkInternal,
        navigationItem,
        navigationLink,
        placeholderString,
        productOption,
        productWithVariant,
        proxyString,
        seoHome,
        seoPage,
        seoShopify,
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
        moduleImage,
        moduleImages,
        moduleImageMobile,
        moduleImageTablet,
        moduleContent,
        moduleTrustpilot,
        moduleCarousel,
        moduleVideo,
    ]),
});
