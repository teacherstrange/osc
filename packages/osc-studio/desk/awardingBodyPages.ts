import type { StructureBuilder } from 'sanity/desk';

export const awardingBodyPages = (S: StructureBuilder) =>
    S.listItem()
        .title('Awarding Body Pages')
        .schemaType('awardingBodyPages')
        .child(S.documentTypeList('awardingBodyPages'));
