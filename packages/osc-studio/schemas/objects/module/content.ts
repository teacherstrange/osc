import { EditIcon } from '@sanity/icons';

const SPACING = [10, 50, 110, 210];

export default {
    name: 'module.content',
    title: 'Content',
    type: 'object',
    icon: EditIcon,
    groups: [
        {
            default: true,
            name: 'spacing',
            title: 'Spacing'
        },
        {
            name: 'content',
            title: 'Content'
        }
    ],
    fields: [
        {
            name: 'marginBottom',
            title: 'Push Region',
            type: 'number',
            description: 'Spacing you would like between this region and the next.',
            options: {
                list: SPACING,
                layout: 'dropdown'
            },
            group: 'spacing'
        },
        {
            name: 'paddingTop',
            title: 'Inner Padding Top',
            type: 'number',
            description: 'Inner padding at the top of the region.',
            options: {
                list: SPACING,
                layout: 'dropdown'
            },
            group: 'spacing'
        },
        {
            name: 'paddingBottom',
            title: 'Inner Padding Bottom',
            type: 'number',
            description: 'Inner padding at the bottom of the region.',
            options: {
                list: SPACING,
                layout: 'dropdown'
            },
            group: 'spacing'
        },
        {
            name: 'horizontalAlignment',
            title: 'Horizontal Alignment',
            type: 'string',
            description:
                'Select the position you want the content to be aligned to on horizontal axis.',
            options: {
                list: ['left', 'centre', 'right'],
                layout: 'radio',
                direction: 'horizontal'
            },
            group: 'content'
        },
        {
            name: 'backgroundColor',
            title: 'Background Colour',
            type: 'string',
            options: {
                list: ['primary', 'secondary', 'tertiary'],
                layout: 'dropdown'
            },
            group: 'content'
        },
        {
            name: 'textColor',
            title: 'Text Colour',
            type: 'string',
            options: {
                list: ['primary', 'secondary', 'tertiary'],
                layout: 'dropdown'
            },
            group: 'content'
        },
        {
            name: 'body',
            title: 'Body',
            type: 'body',
            group: 'content'
        }
    ],
    preview: {
        select: {
            title: 'body'
        },
        prepare(selection: Record<string, any>) {
            const title = selection.title[0].children[0].text; // display the first item from the body content

            return {
                subtitle: 'Content',
                title
            };
        }
    }
};
