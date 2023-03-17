import type { StructureBuilder } from 'sanity/desk';

export const settings = (S: StructureBuilder) =>
    S.listItem()
        .title('Settings')
        .schemaType('settings')
        .child(S.editor().title('Settings').schemaType('settings').documentId('settings'));
