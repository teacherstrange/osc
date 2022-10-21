import S from '@sanity/desk-tool/structure-builder';
import { DocumentsIcon } from '@sanity/icons';

// prettier-ignore
export const redirects = S.listItem()
    .title('Redirects')
    .icon(DocumentsIcon)
    .schemaType('redirect')
    .child(S.documentTypeList('redirect'));
