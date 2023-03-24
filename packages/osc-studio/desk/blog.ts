import Iframe from 'sanity-plugin-iframe-pane';
import { SEOPane } from 'sanity-plugin-seo-pane';
import type { StructureBuilder } from 'sanity/desk';
import type { SanityDocumentWithSlug } from '../utils/resolveProductionUrl';
import { resolveProductionUrl } from '../utils/resolveProductionUrl';

// prettier-ignore
export const blog = (S: StructureBuilder) =>
    S.listItem()
        .title('Blog')
        .schemaType('blog')
        .child(
            S.document()
                .title('Blog')
                .schemaType('blog')
                .documentId('blog')
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
