import { defineField, defineType } from 'sanity';
import { ColorPicker } from '../../components/inputs/ColorPicker';
import { SPACING } from '../../constants';

export default defineType({
    name: 'rowSettings',
    title: 'Settings',
    type: 'object',
    groups: [
        {
            name: 'spacing',
            title: 'Spacing',
            default: true,
        },
        {
            name: 'background',
            title: 'Background',
        },
        {
            name: 'container',
            title: 'Container',
        },
    ],
    fields: [
        defineField({
            name: 'marginBottom',
            title: 'Push Region',
            type: 'string',
            description: 'Spacing you would like between this region and the next.',
            initialValue: 'l',
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
            name: 'backgroundColor',
            title: 'Background Colour',
            type: 'string',
            components: {
                input: ColorPicker,
            },
            group: 'background',
        }),
        defineField({
            name: 'container',
            title: 'Container',
            type: 'string',
            description: 'Sets the width of the component',
            initialValue: 'default',
            group: 'container',
            options: {
                list: ['default', 'full'],
                layout: 'radio',
                direction: 'horizontal',
            },
        }),
    ],
});
