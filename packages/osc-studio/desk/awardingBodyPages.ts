import type { StructureBuilder } from 'sanity/desk';

export const awardingBodyPages = (S: StructureBuilder) =>
    S.listItem().title('Awarding Bodies').schemaType('award').child(S.documentTypeList('award'));
