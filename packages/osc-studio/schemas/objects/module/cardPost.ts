export default {
    name: 'card.post',
    title: 'Post Card',
    type: 'object',
    fields: [
        {
            name: 'reference',
            type: 'reference',
            weak: true,
            to: { type: 'post' },
            options: {
                disableNew: true,
            },
        },
    ],
    preview: {
        select: {
            title: 'reference.title',
        },
        prepare(selection: Record<string, any>) {
            const title = selection.title;

            return {
                title,
                subtitle: 'Post Card',
            };
        },
    },
};
