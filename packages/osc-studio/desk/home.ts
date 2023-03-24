import Iframe from 'sanity-plugin-iframe-pane';
import { SEOPane } from 'sanity-plugin-seo-pane';
import type { StructureBuilder } from 'sanity/desk';
import type { SanityDocumentWithSlug } from '../utils/resolveProductionUrl';
import { resolveProductionUrl } from '../utils/resolveProductionUrl';

// prettier-ignore
export const home = (S: StructureBuilder) =>
    S.listItem()
        .title('Home')
        .schemaType('home')
        .child(
            S.document()
                .title('Home')
                .schemaType('home')
                .documentId('home')
                .views([
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
                    S.view
                        .component(SEOPane)
                        .options({
                            // Retrieve the keywords and synonyms at the given dot-notated strings
                            keywords: `seo.keywords`,
                            synonyms: `seo.synonyms`,
                            url: (doc: SanityDocumentWithSlug) => resolveProductionUrl(doc),
                        })
                        .title('SEO'),
                ])
        );
