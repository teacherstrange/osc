import { EditIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'module.content',
    title: 'Content',
    type: 'object',
    icon: EditIcon,
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
            name: 'horizontalAlignment',
            title: 'Horizontal Alignment',
            type: 'string',
            description:
                'Select the position you want the content to be aligned to on horizontal axis.',
            options: {
                list: ['left', 'centre', 'right'],
                layout: 'radio',
                direction: 'horizontal',
            },
            initialValue: 'left',
            group: 'content',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'body',
            group: 'content',
        }),
        defineField({
            name: 'buttons',
            title: 'Buttons',
            type: 'array',
            of: [{ type: 'module.button' }],
            group: 'content',
        }),
    ],
    preview: {
        select: {
            title: 'body',
        },
        prepare(selection) {
            const title = selection.title[0].children[0].text; // display the first item from the body content

            return {
                subtitle: 'Content',
                title,
            };
        },
    },
});
