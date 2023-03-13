import { GridIcon } from '@radix-ui/react-icons';
import { SPACING } from '../../../constants';

export default {
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
        {
            name: 'marginBottom',
            title: 'Push Region',
            type: 'string',
            description: 'Spacing you would like between this region and the next.',
            options: {
                list: SPACING,
                layout: 'dropdown',
            },
            group: 'spacing',
        },
        {
            name: 'paddingTop',
            title: 'Inner Padding Top',
            type: 'string',
            description: 'Inner padding at the top of the region.',
            options: {
                list: SPACING,
                layout: 'dropdown',
            },
            group: 'spacing',
        },
        {
            name: 'paddingBottom',
            title: 'Inner Padding Bottom',
            type: 'string',
            description: 'Inner padding at the bottom of the region.',
            options: {
                list: SPACING,
                layout: 'dropdown',
            },
            group: 'spacing',
        },
        {
            name: 'heading',
            title: 'Heading',
            type: 'string',
            group: 'content',
        },
        {
            name: 'hasInlineHeading',
            title: 'Inline Heading',
            type: 'boolean',
            initialValue: false,
            description: 'Places the heading into the first cell of the grid',
            group: 'content',
        },
        {
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [{ type: 'textGridItem' }],
            group: 'content',
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
