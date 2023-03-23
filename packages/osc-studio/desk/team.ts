import type { StructureBuilder } from 'sanity/desk';

export const team = (S: StructureBuilder) =>
    S.listItem().title('Team').schemaType('team').child(S.documentTypeList('team'));
