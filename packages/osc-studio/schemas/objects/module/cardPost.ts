import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'card.post',
    title: 'Post Card',
    type: 'object',
    fields: [
        defineField({
            name: 'reference',
            type: 'reference',
            weak: true,
            to: { type: 'post' },
            options: {
                disableNew: true,
            },
        }),
        defineField({
            name: 'fullWidth',
            title: 'Full Width',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'reference.title',
        },
        prepare(selection) {
            const title = selection.title;

            return {
                title,
                subtitle: 'Post Card',
            };
        },
    },
});
