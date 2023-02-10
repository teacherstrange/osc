import { EditIcon } from '@sanity/icons';
// import VariantPicker from '../../../components/inputs/VariantPicker/VariantPicker';
import { ColorPicker } from '../../../components/inputs/ColorPicker';
import { SPACING } from '../../../constants';

export default {
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
        },
        {
            name: 'backgroundColor',
            title: 'Background Colour',
            type: 'string',
            inputComponent: ColorPicker,
            group: 'content',
        },
        {
            name: 'body',
            title: 'Body',
            type: 'body',
            group: 'content',
        },
        {
            name: 'buttons',
            title: 'Buttons',
            type: 'array',
            of: [{ type: 'module.button' }],
            group: 'content',
        },
    ],
    preview: {
        select: {
            title: 'body',
        },
        prepare(selection: Record<string, any>) {
            const title = selection.title[0].children[0].text; // display the first item from the body content

            return {
                subtitle: 'Content',
                title,
            };
        },
    },
};
