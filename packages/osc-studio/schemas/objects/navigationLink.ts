import { PAGE_REFERENCES } from '../../constants.js';

export default {
    name: 'navigation.link',
    type: 'object',
    title: 'Link',
    fields: [
        {
            name: 'target',
            type: 'string',
            initialValue: 'Internal',
            options: {
                list: ['Internal', 'External', 'Trigger'],
                layout: 'radio',
                direction: 'horizontal',
            },
        },
        {
            title: 'Navigation Label',
            name: 'navigationLabel',
            type: 'string',
            description:
                'For internal links this will default to the title of the target if left blank.',
        },
        {
            name: 'internalLink',
            Title: 'Internal Link',
            type: 'reference',
            weak: true,
            to: PAGE_REFERENCES,
            hidden: ({ parent, value }) => !value && parent?.target !== 'Internal',
        },
        {
            name: 'externalLink',
            title: 'External Link',
            type: 'url',
            validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
            hidden: ({ parent, value }) => !value && parent?.target !== 'External',
        },
        {
            type: 'array',
            name: 'items',
            title: 'Items',
            of: [{ type: 'navigation.link' }],
            hidden: ({ parent, value }) => !value && parent?.target !== 'Trigger',
        },
    ],
    preview: {
        select: {
            title: 'navigationLabel',
            targetTitle: 'internalLink.title',
            targetStoreTitle: 'internalLink.store.title',
            externalLink: 'externalLink',
        },
        prepare: ({ title, targetTitle, targetStoreTitle, externalLink }) => ({
            title: title || targetTitle || targetStoreTitle || externalLink,
        }),
    },
};
