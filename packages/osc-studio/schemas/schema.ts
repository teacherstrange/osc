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
import page from './documents/page';
import post from './documents/post';
import product from './documents/product';
import productVariant from './documents/productVariant';
import redirects from './documents/redirects';

// Singleton document types
import home from './singletons/home';
import blog from './singletons/blog';
import settings from './singletons/settings';

// Block content
import body from './blocks/body';

// Object types
import collectionRule from './objects/collectionRule';
import linkExternal from './objects/linkExternal';
import linkInternal from './objects/linkInternal';
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
import moduleImage from './objects/module/image';
import moduleImages from './objects/module/images';
import moduleContent from './objects/module/content';
import moduleTrustpilot from './objects/module/trustpilot';
import moduleCarousel from './objects/module/carousel';

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
        page,
        post,
        product,
        productVariant,
        redirects,
        // Singleton document types
        home,
        blog,
        settings,
        // Block content
        body,
        // Objects
        collectionRule,
        linkExternal,
        linkInternal,
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
        moduleImage,
        moduleImages,
        moduleContent,
        moduleTrustpilot,
        moduleCarousel
    ])
});
