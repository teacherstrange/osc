import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'card.collection',
    title: 'Collection Card',
    type: 'object',
    fields: [
        defineField({
            name: 'reference',
            type: 'reference',
            weak: true,
            to: { type: 'collection' },
            options: {
                disableNew: true,
            },
        }),
        defineField({
            name: 'variant',
            title: 'Variant',
            type: 'string',
            initialValue: 'lg',
            options: {
                list: ['lg', 'md', 'sm'],
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
                subtitle: 'Collection Card',
            };
        },
    },
});
