export default {
    name: 'card.collection',
    title: 'Collection Card',
    type: 'object',
    fields: [
        {
            name: 'reference',
            type: 'reference',
            weak: true,
            to: { type: 'collection' },
            options: {
                disableNew: true,
            },
        },
    ],
    preview: {
        select: {
            title: 'reference.store.title',
        },
        prepare(selection: Record<string, any>) {
            const title = selection.title;

            return {
                title,
                subtitle: 'Collection Card',
            };
        },
    },
};
