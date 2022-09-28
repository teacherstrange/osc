import S from '@sanity/desk-tool/structure-builder';

// prettier-ignore
export const blog = S.listItem()
  .title('Blog')
  .schemaType('blog')
  .child(
    S.editor()
      .title('Blog')
      .schemaType('blog')
      .documentId('blog')
  )
