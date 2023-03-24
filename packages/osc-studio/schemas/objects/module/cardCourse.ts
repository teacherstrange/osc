import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'card.course',
    title: 'Course Card',
    type: 'object',
    fields: [
        defineField({
            name: 'reference',
            type: 'reference',
            weak: true,
            to: { type: 'product' },
            options: {
                disableNew: true,
            },
        }),
    ],
    preview: {
        select: {
            title: 'reference.store.title',
        },
        prepare(selection) {
            const title = selection.title;

            return {
                title,
                subtitle: 'Course Card',
            };
        },
    },
});
