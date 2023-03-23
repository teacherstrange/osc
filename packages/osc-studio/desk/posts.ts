import { DocumentsIcon } from '@sanity/icons';
import type { StructureBuilder } from 'sanity/desk';

export const posts = (S: StructureBuilder) =>
    S.listItem()
        .title('Posts')
        .icon(DocumentsIcon)
        .schemaType('post')
        .child(S.documentTypeList('post'));
