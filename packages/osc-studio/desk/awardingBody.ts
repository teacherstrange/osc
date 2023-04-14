import type { StructureBuilder } from 'sanity/desk';

export const awardingBody = (S: StructureBuilder) =>
    S.listItem()
        .title('Awarding Body')
        .schemaType('awardingBody')
        .child(S.documentTypeList('awardingBody'));
