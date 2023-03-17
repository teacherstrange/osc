import Iframe from 'sanity-plugin-iframe-pane';
import SeoPane from 'sanity-plugin-seo-pane';
import type { StructureBuilder } from 'sanity/desk';
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
                ])
        );
