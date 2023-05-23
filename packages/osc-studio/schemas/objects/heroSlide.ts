import { IdCardIcon } from '@radix-ui/react-icons';
import { defineField, defineType } from 'sanity';
import { ColorPicker } from '../../components/inputs/ColorPicker';

export default defineType({
    name: 'heroSlide',
    title: 'Hero',
    type: 'object',
    icon: IdCardIcon,
    groups: [
        {
            name: 'settings',
            title: 'Settings',
        },
        {
            name: 'content',
            title: 'Content',
            default: true,
        },
        {
            name: 'media',
            title: 'Media',
        },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            group: 'content',
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'module.content',
            group: 'content',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image.desktop',
            group: 'media',
        }),
        defineField({
            name: 'backgroundColor',
            title: 'Background Colour',
            type: 'string',
            initialValue: 'gradient-nonary-270',
            components: {
                input: ColorPicker,
            },
            group: 'settings',
        }),
        defineField({
            name: 'titleColor',
            title: 'Title Colour',
            type: 'string',
            initialValue: 'secondary',
            components: {
                input: ColorPicker,
            },
            group: 'settings',
        }),
        defineField({
            name: 'variant',
            title: 'Variant',
            type: 'string',
            options: {
                list: ['primary', 'secondary', 'tertiary'],
                layout: 'radio',
                direction: 'horizontal',
            },
            initialValue: 'primary',
            group: 'settings',
        }),
        defineField({
            name: 'showFlourishes',
            title: 'Show Flourishes',
            type: 'boolean',
            initialValue: false,
            group: 'settings',
        }),
        defineField({
            name: 'flourishes',
            title: 'Flourishes',
            type: 'flourishes',
            group: 'settings',
            hidden: ({ parent }) => parent?.showFlourishes !== true,
        }),
    ],
});
