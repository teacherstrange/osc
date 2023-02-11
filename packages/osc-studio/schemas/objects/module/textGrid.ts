import { GridIcon } from '@radix-ui/react-icons';

export default {
    name: 'module.textGrid',
    title: 'Text Grid',
    type: 'object',
    icon: GridIcon,
    fields: [
        {
            name: 'heading',
            title: 'Heading',
            type: 'string',
        },
        {
            name: 'hasInlineHeading',
            title: 'Inline Heading',
            type: 'boolean',
            initialValue: false,
            description: 'Places the heading into the first cell of the grid',
        },
        {
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [{ type: 'textGridItem' }],
        },
    ],
    preview: {
        select: {
            title: 'heading',
        },
        prepare(selection) {
            const { title } = selection;
            return {
                title,
                subtitle: 'Text Grid',
            };
        },
    },
};
