export default {
    name: 'card.bio',
    title: 'Bio Card',
    type: 'object',
    fields: [
        {
            name: 'reference',
            type: 'reference',
            weak: true,
            to: { type: 'team' },
            options: {
                disableNew: true,
            },
        },
    ],
    preview: {
        select: {
            title: 'reference.name',
        },
        prepare(selection: Record<string, any>) {
            const { title } = selection;

            return {
                title,
                subtitle: 'Bio Card',
            };
        },
    },
};
