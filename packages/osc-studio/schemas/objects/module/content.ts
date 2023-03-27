import { EditIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { ColorPicker } from '../../../components/inputs/ColorPicker';
import { SPACING } from '../../../constants';

export default defineType({
    name: 'module.content',
    title: 'Content',
    type: 'object',
    icon: EditIcon,
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
            name: 'paddingLeft',
            title: 'Inner Padding Left',
            type: 'string',
            description: 'Inner padding at the left of the region.',
            options: {
                list: SPACING,
                layout: 'dropdown',
            },
            group: 'spacing',
        }),
        defineField({
            name: 'paddingRight',
            title: 'Inner Padding Right',
            type: 'string',
            description: 'Inner padding at the right of the region.',
            options: {
                list: SPACING,
                layout: 'dropdown',
            },
            group: 'spacing',
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
            name: 'backgroundColor',
            title: 'Background Colour',
            type: 'string',
            components: {
                input: ColorPicker,
            },
            group: 'content',
        }),
        defineField({
            name: 'fullWidth',
            title: 'Full Width',
            type: 'boolean',
            description: 'Whether the content should fill the width of the container.',
            group: 'content',
            initialValue: false,
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
