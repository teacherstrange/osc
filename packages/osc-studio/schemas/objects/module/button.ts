import { SquareIcon } from '@sanity/icons';
import { PAGE_REFERENCES } from '../../../constants';

export default {
    name: 'module.button',
    title: 'Button',
    type: 'object',
    icon: SquareIcon,
    fields: [
        {
            name: 'colour',
            title: 'Colour',
            type: 'string',
            initialValue: 'primary',
            options: {
                list: ['primary', 'secondary', 'tertiary', 'quaternary'],
                layout: 'radio',
                direction: 'horizontal'
            }
        },
        {
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: (Rule) => Rule.required()
        },
        {
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: ['file', 'email', 'external', 'internal', 'no link', 'copy to clipboard'],
                layout: 'radio',
                direction: 'horizontal'
            }
        },
        {
            name: 'file',
            title: 'File',
            type: 'file',
            hidden: ({ parent }) => parent?.type !== 'file'
        },
        {
            name: 'email',
            title: 'Email address',
            type: 'email',
            hidden: ({ parent }) => parent?.type !== 'email'
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
                    validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] })
                },
                {
                    title: 'Open in a new window?',
                    name: 'newWindow',
                    type: 'boolean',
                    initialValue: true
                }
            ],
            hidden: ({ parent }) => parent?.type !== 'external'
        },
        {
            name: 'reference',
            type: 'reference',
            weak: true,
            to: PAGE_REFERENCES,
            hidden: ({ parent }) => parent?.type !== 'internal'
        },
        {
            name: 'textToCopy',
            title: 'Text to copy',
            type: 'string',
            description: 'If left blank this will default to the button label',
            hidden: ({ parent }) => parent?.type !== 'copy to clipboard'
        }
    ]
};
