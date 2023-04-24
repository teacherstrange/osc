import type { StructureBuilder } from 'sanity/desk';

export const testimonials = (S: StructureBuilder) =>
    S.listItem()
        .title('Testimonials ')
        .schemaType('testimonials')
        .child(S.documentTypeList('testimonials'));
