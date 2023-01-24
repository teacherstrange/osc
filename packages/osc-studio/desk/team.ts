import S from '@sanity/desk-tool/structure-builder';

// prettier-ignore
export const team = S.listItem()
    .title('Team')
    .schemaType('team')
    .child(S.documentTypeList('team'));
