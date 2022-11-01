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

import S from '@sanity/desk-tool/structure-builder';
import Iframe from 'sanity-plugin-iframe-pane';
import SeoPane from 'sanity-plugin-seo-pane';
import { resolveProductionUrl } from './utils/resolveProductionUrl';
import { collections } from './desk/collections';
import { home } from './desk/home';
import { pages } from './desk/pages';
import { products } from './desk/products';
import { settings } from './desk/settings';
import { blog } from './desk/blog';
import { posts } from './desk/posts';

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
    'post'
];

/**
 * Here we declare which view panes show up for which schema types
 *
 * NOTE: This only applies to simple documents such as pages or collections.
 * Singletons (i.e. home) or complex documents (i.e. products) will need to add the view directly
 * into the document file.
 */
export const getDefaultDocumentNode = ({ schemaType }) => {
    return S.document().views([
        S.view.form(),
        // Including the iframe pane, with a function to create the url
        S.view
            .component(Iframe)
            .options({
                url: (doc) => resolveProductionUrl(doc),
                reload: {
                    button: true,
                    revision: true
                }
            })
            .title('Preview'),
        S.view
            .component(SeoPane)
            .options({
                // Retrieve the keywords and synonyms at the given dot-notated strings
                keywords: `seo.keywords`,
                synonyms: `seo.synonyms`,
                url: (doc) => resolveProductionUrl(doc)
            })
            .title('SEO')
    ]);
};

// Then we export the default list of menu items
export default () => {
    // prettier-ignore
    return (
    S.list()
      .title('Content')
      .items([
        home,
        pages,
        S.divider(),
        blog,
        posts,
        S.divider(),
        collections,
        products,
        S.divider(),
        settings,
        S.divider(),
        // Automatically add new document types to the root pane
        ...S.documentTypeListItems().filter(listItem => !DOCUMENT_TYPES_IN_STRUCTURE.includes(listItem.getId()))
      ])
  )
};
