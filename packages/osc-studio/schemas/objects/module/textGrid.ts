import { GridIcon } from '@radix-ui/react-icons';
import { defineField, defineType } from 'sanity';
import { SPACING } from '../../../constants';

export default defineType({
    name: 'module.textGrid',
    title: 'Text Grid',
    type: 'object',
    icon: GridIcon,
    groups: [
        {
            name: 'spacing',
            title: 'Spacing',
        },
        {
            name: 'content',
            title: 'Content',
            default: true,
        },
    ],
    fields: [
        defineField({
            name: 'marginBottom',
            title: 'Push Region',
            type: 'string',
            description: 'Spacing you would like between this region and the next.',
            options: {
                list: SPACING,
                layout: 'dropdown',
            },
            group: 'spacing',
        }),
        defineField({
            name: 'paddingTop',
            title: 'Inner Padding Top',
            type: 'string',
            description: 'Inner padding at the top of the region.',
            options: {
                list: SPACING,
                layout: 'dropdown',
            },
            group: 'spacing',
        }),
        defineField({
            name: 'paddingBottom',
            title: 'Inner Padding Bottom',
            type: 'string',
            description: 'Inner padding at the bottom of the region.',
            options: {
                list: SPACING,
                layout: 'dropdown',
            },
            group: 'spacing',
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
