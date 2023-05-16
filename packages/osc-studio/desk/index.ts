/**
 * Desk structure overrides
 *
 * Sanity Studio automatically lists document types out of the box.
 * With this custom desk structure we achieve things like showing the `home`
 * and `settings` document types as singletons, and grouping product details
 * and variants for easy editorial access.
 *
 * You can customize this even further as your schemas progress.
 * To learn more about structure builder, visit our docs:
 * https://www.sanity.io/docs/overview-structure-builder
 */

import Iframe from 'sanity-plugin-iframe-pane';
import type { DefaultDocumentNodeResolver, StructureResolver } from 'sanity/desk';
import type { SanityDocumentWithSlug } from '../utils/resolveProductionUrl';
import { resolveProductionUrl } from '../utils/resolveProductionUrl';
import { awardingBody } from './awardingBody';
import { awardingBodyPages } from './awardingBodyPages';
import { blog } from './blog';
import { collections } from './collections';
import { faqs } from './faqs';
import { home } from './home';
import { navigation } from './navigation';
import { pages } from './pages';
import { posts } from './posts';
import { products } from './products';
import { redirects } from './redirects';
import { settings } from './settings';
import { team } from './team';
import { testimonials } from './testimonials';

// If you add document types to desk structure manually, you can add them to this array to prevent duplicates in the root pane
const DOCUMENT_TYPES_IN_STRUCTURE = [
    'awardingBody',
    'awardingBodyPages',
    'collection',
    'faqs',
    'home',
    'media.tag',
    'page',
    'product',
    'productVariant',
    'settings',
    'blog',
    'post',
    'redirect',
    'navigation',
    'team',
    'testimonials',
];

// Items that we don't want to enable the preview/seo pane
const NO_PREVIEW = ['awardingBody', 'redirect', 'navigation', 'faqs', 'team', 'testimonials'];

/**
 * Here we declare which view panes show up for which schema types
 *
 * NOTE: This only applies to simple documents such as pages or collections.
 * Singletons (i.e. home) or complex documents (i.e. products) will need to add the view directly
 * into the document file.
 */
export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
    if (NO_PREVIEW.includes(schemaType)) {
        return;
    }

    return S.document().views([
        S.view.form(),
        // Including the iframe pane, with a function to create the url
        S.view
            .component(Iframe)
            .options({
                url: (doc: SanityDocumentWithSlug) => resolveProductionUrl(doc),
                reload: {
                    button: true,
                    revision: true,
                },
            })
            .title('Preview'),
        // S.view
        //     .component(SEOPane)
        //     .options({
        //         // Retrieve the keywords and synonyms at the given dot-notated strings
        //         keywords: `seo.keywords`,
        //         synonyms: `seo.synonyms`,
        //         url: (doc: SanityDocumentWithSlug) => resolveProductionUrl(doc),
        //     })
        //     .title('SEO'),
    ]);
};

// Then we export the default list of menu items
export const structure: StructureResolver = (S, context) => {
    // prettier-ignore
    return S.list()
        .title('Content')
        .items([
            home(S),
            pages(S),
            awardingBodyPages(S),
            S.divider(),
            blog(S),
            posts(S),
            S.divider(),
            collections(S),
            products(S),
            S.divider(),
            team(S),
            awardingBody(S),
            faqs(S),
            testimonials(S),
            S.divider(),
            settings(S),
            navigation(S),
            redirects(S),
            S.divider(),
            // Automatically add new document types to the root pane
            ...S.documentTypeListItems().filter(
                (listItem) => !DOCUMENT_TYPES_IN_STRUCTURE.includes(listItem.getId()!)
            ),
        ]);
};
