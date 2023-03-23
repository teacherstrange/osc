import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'card.bio',
    title: 'Bio Card',
    type: 'object',
    fields: [
        defineField({
            name: 'reference',
            type: 'reference',
            weak: true,
            to: { type: 'team' },
            options: {
                disableNew: true,
            },
        }),
    ],
    preview: {
        select: {
            title: 'reference.name',
        },
        prepare(selection) {
            const { title } = selection;

            return {
                title,
                subtitle: 'Bio Card',
            };
        },
    },
});
