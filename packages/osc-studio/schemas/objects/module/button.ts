import { ButtonIcon } from '@radix-ui/react-icons';
import { IconPicker } from '../../../components/inputs/IconPicker';
import { PAGE_REFERENCES } from '../../../constants';

export default {
    name: 'module.button',
    title: 'Button',
    type: 'object',
    icon: ButtonIcon,
    fields: [
        {
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'icon',
            title: 'Icon',
            type: 'string',
            inputComponent: IconPicker,
            placeholder: 'Select an icon...',
        },
        {
            name: 'variant',
            title: 'Variant',
            type: 'string',
            options: {
                list: [
                    'primary',
                    'secondary',
                    'tertiary',
                    'quaternary',
                    'quinary',
                    'primary-gradient',
                    'secondary-gradient',
                ],
                layout: 'radio',
                direction: 'horizontal',
            },
            initialValue: 'primary',
        },
        {
            name: 'isInversed',
            title: 'Inverse',
            type: 'boolean',
            initialValue: false,
            description: 'Inverse the color of the button',
        },
        {
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: ['file', 'email', 'external', 'internal', 'telephone', 'copy to clipboard'],
                layout: 'radio',
                direction: 'horizontal',
            },
            initialValue: 'internal',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'file',
            title: 'File',
            type: 'file',
            hidden: ({ parent }) => parent?.type !== 'file',
        },
        {
            name: 'email',
            title: 'Email address',
            type: 'email',
            hidden: ({ parent }) => parent?.type !== 'email',
        },
        {
            name: 'externalLink',
            title: 'External link',
            type: 'object',
            fields: [
                {
                    name: 'url',
                    title: 'URL',
                    type: 'url',
                    validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
                },
                {
                    title: 'Open in a new window?',
                    name: 'newWindow',
                    type: 'boolean',
                    initialValue: true,
                },
            ],
            hidden: ({ parent }) => parent?.type !== 'external',
        },
        {
            name: 'telephone',
            title: 'Telephone number',
            type: 'string',
            hidden: ({ parent }) => parent?.type !== 'telephone',
        },
        {
            name: 'reference',
            type: 'reference',
            weak: true,
            to: PAGE_REFERENCES,
            hidden: ({ parent }) => parent?.type !== 'internal',
        },
        {
            name: 'textToCopy',
            title: 'Text to copy',
            type: 'string',
            description: 'If left blank this will default to the button label',
            hidden: ({ parent }) => parent?.type !== 'copy to clipboard',
        },
    ],
    preview: {
        select: {
            title: 'label',
            subtitle: 'type',
        },
        prepare(selection) {
            const { title, subtitle } = selection;
            return {
                title,
                subtitle: subtitle.charAt(0).toUpperCase() + subtitle.slice(1),
            };
        },
    },
};
