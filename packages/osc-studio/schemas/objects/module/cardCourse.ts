export default {
    name: 'card.course',
    title: 'Course Card',
    type: 'object',
    fields: [
        {
            name: 'reference',
            type: 'reference',
            weak: true,
            to: { type: 'product' },
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
                subtitle: 'Course Card',
            };
        },
    },
};
