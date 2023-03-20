/**
 * Desk structure overrides
 *
 * This file configure how documents are structured in the Studio's desk tool.
 * It works because
    {
      "name": "part:@sanity/desk-tool/structure",
      "path": "./deskStructure.js"
    },
  * is added to the `parts` array in `/sanity.json`.
  *
  * Sanity Studio automatically lists document types out of the box.
  * With this custom desk structure we achieve things like showing the `home`
  * and `settings` document types as singletons, and grouping product details
  * and variants for easy editorial access.
  *
  * You can customize this even further as your schemas progress.
  * To learn more about structure builder, visit our docs:
  * https://www.sanity.io/docs/overview-structure-builder
 */

import Iframe from 'sanity-plugin-iframe-pane';
import { SEOPane } from 'sanity-plugin-seo-pane';
import type { DefaultDocumentNodeResolver, StructureResolver } from 'sanity/desk';
import { resolveProductionUrl } from '../utils/resolveProductionUrl';
import { blog } from './blog';
import { collections } from './collections';
import { home } from './home';
import { navigation } from './navigation';
import { pages } from './pages';
import { posts } from './posts';
import { products } from './products';
import { redirects } from './redirects';
import { settings } from './settings';
import { team } from './team';

// If you add document types to desk structure manually, you can add them to this array to prevent duplicates in the root pane
const DOCUMENT_TYPES_IN_STRUCTURE = [
    'collection',
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
];

/**
 * Here we declare which view panes show up for which schema types
 *
 * NOTE: This only applies to simple documents such as pages or collections.
 * Singletons (i.e. home) or complex documents (i.e. products) will need to add the view directly
 * into the document file.
 */
export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
    // Don't add the preview or seo pane to the redirect
    if (schemaType === 'redirect' || schemaType === 'navigation' || schemaType === 'team') {
        return;
    }

    return S.document().views([
        S.view.form(),
        // Including the iframe pane, with a function to create the url
        S.view
            .component(Iframe)
            .options({
                url: (doc) => resolveProductionUrl(doc),
                reload: {
                    button: true,
                    revision: true,
                },
            })
            .title('Preview'),
        S.view
            .component(SEOPane)
            .options({
                // Retrieve the keywords and synonyms at the given dot-notated strings
                keywords: `seo.keywords`,
                synonyms: `seo.synonyms`,
                url: (doc) => resolveProductionUrl(doc),
            })
            .title('SEO'),
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
            S.divider(),
            blog(S),
            posts(S),
            S.divider(),
            collections(S),
            products(S),
            S.divider(),
            team(S),
            S.divider(),
            settings(S),
            navigation(S),
            redirects(S),
            S.divider(),
            // Automatically add new document types to the root pane
            ...S.documentTypeListItems().filter(
                (listItem) => !DOCUMENT_TYPES_IN_STRUCTURE.includes(listItem.getId())
            )
        ]);
};
