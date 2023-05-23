import { GridIcon } from '@radix-ui/react-icons';
import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'module.textGrid',
    title: 'Text Grid',
    type: 'object',
    icon: GridIcon,
    groups: [
        {
            name: 'row',
            title: 'Row',
        },
        {
            name: 'content',
            title: 'Content',
            default: true,
        },
    ],
    fields: [
        defineField({
            name: 'rowSettings',
            title: 'Settings',
            type: 'rowSettings',
            group: 'row',
        }),
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            group: 'content',
        }),
        defineField({
            name: 'hasInlineHeading',
            title: 'Inline Heading',
            type: 'boolean',
            initialValue: false,
            description: 'Places the heading into the first cell of the grid',
            group: 'content',
        }),
        defineField({
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [{ type: 'textGridItem' }],
            group: 'content',
        }),
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
});
