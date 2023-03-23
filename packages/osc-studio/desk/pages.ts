import { DocumentsIcon } from '@sanity/icons';
import type { StructureBuilder } from 'sanity/desk';

// prettier-ignore
export const pages = (S: StructureBuilder) =>
    S.listItem()
    .title('Pages')
    .icon(DocumentsIcon)
    .schemaType('page')
    .child(
        S.documentTypeList('page')
  )
