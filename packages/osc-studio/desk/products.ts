import { InfoOutlineIcon } from '@sanity/icons';
import Iframe from 'sanity-plugin-iframe-pane';
import { SEOPane } from 'sanity-plugin-seo-pane';
import type { StructureBuilder } from 'sanity/desk';
import type { SanityDocumentWithSlug } from '../utils/resolveProductionUrl';
import { resolveProductionUrl } from '../utils/resolveProductionUrl';

// prettier-ignore
export const products = (S: StructureBuilder) =>
    S.listItem()
        .title('Products')
        .schemaType('product')
        .child(
            S.documentTypeList('product')
                // .defaultLayout('detail')
                .child(async (id) =>
                    S.list()
                        .title('Product')
                        .items([
                            // Details
                            S.listItem()
                                .title('Details')
                                .icon(InfoOutlineIcon)
                                .child(
                                    S.document()
                                        .schemaType('product')
                                        .documentId(id)
                                        .views([
                                            S.view.form(),
                                            // Including the iframe pane, with a function to create the url
                                            S.view
                                                .component(Iframe)
                                                .options({
                                                    url: (doc: SanityDocumentWithSlug) =>
                                                        resolveProductionUrl(doc),
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
                                                    url: (doc: SanityDocumentWithSlug) =>
                                                        resolveProductionUrl(doc),
                                                })
                                                .title('SEO'),
                                        ])
                                ),
                            // Product variants
                            S.listItem()
                                .title('Variants')
                                .schemaType('productVariant')
                                .child(
                                    S.documentList()
                                        .title('Variants')
                                        .schemaType('productVariant')
                                        .filter(
                                            `
                        _type == "productVariant"
                        && store.productId == $productId
                        `
                                        )
                                        .params({
                                            productId: Number(id.replace('shopifyProduct-', '')),
                                        })
                                ),
                        ])
                )
        );
