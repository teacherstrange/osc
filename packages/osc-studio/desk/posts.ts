import S from '@sanity/desk-tool/structure-builder';
import { DocumentsIcon } from '@sanity/icons';

// prettier-ignore
export const posts = S.listItem()
  .title('Posts')
  .icon(DocumentsIcon)
  .schemaType('post')
  .child(
    S.documentTypeList('post')
  )
