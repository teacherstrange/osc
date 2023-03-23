import { ArrowRightIcon } from '@sanity/icons';
import type { StructureBuilder } from 'sanity/desk';

// prettier-ignore
export const redirects = (S: StructureBuilder) =>
    S.listItem()
        .title('Redirects')
        .icon(ArrowRightIcon)
        .schemaType('redirect')
        .child(S.documentTypeList('redirect'));
