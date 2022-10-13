import S from '@sanity/desk-tool/structure-builder';
import Iframe from 'sanity-plugin-iframe-pane';
import { resolveProductionUrl } from '../utils/resolveProductionUrl';

// prettier-ignore
export const blog = S.listItem()
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
                    .title('Preview')
            ])
    );
