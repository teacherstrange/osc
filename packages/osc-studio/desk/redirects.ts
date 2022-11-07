import S from '@sanity/desk-tool/structure-builder';
import { ArrowRightIcon } from '@sanity/icons';

// prettier-ignore
export const redirects = S.listItem()
    .title('Redirects')
    .icon(ArrowRightIcon)
    .schemaType('redirect')
    .child(S.documentTypeList('redirect'));
