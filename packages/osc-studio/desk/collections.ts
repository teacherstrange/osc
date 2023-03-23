import type { StructureBuilder } from 'sanity/desk';

// prettier-ignore
export const collections = (S: StructureBuilder) =>
    S.listItem()
    .title('Collections')
    .schemaType('collection')
    .child(
        S.documentTypeList('collection')
    )
