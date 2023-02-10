import { IdCardIcon } from '@radix-ui/react-icons';
import { ColorPicker } from '../../components/inputs/ColorPicker';

export default {
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
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            group: 'content',
        },
        {
            name: 'content',
            title: 'Content',
            type: 'module.content',
            group: 'content',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image.desktop',
            group: 'media',
        },
        {
            name: 'backgroundColor',
            title: 'Background Colour',
            type: 'string',
            initialValue: 'gradient-nonary-270',
            inputComponent: ColorPicker,
            group: 'settings',
        },
        {
            name: 'titleColor',
            title: 'Title Colour',
            type: 'string',
            initialValue: 'secondary',
            inputComponent: ColorPicker,
            group: 'settings',
        },
        {
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
        },
    ],
};
