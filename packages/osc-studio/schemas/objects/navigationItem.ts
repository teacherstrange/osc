import { defineArrayMember, defineField, defineType } from 'sanity';
import { PAGE_REFERENCES } from '../../constants.js';

export default defineType({
    name: 'navigation.item',
    type: 'object',
    title: 'Item',
    fields: [
        defineField({
            name: 'target',
            type: 'string',
            initialValue: 'Internal',
            options: {
                list: ['Internal', 'External', 'Trigger'],
                layout: 'radio',
                direction: 'horizontal',
            },
        }),
        defineField({
            title: 'Navigation Label',
            name: 'navigationLabel',
            type: 'string',
            description:
                'For internal links this will default to the title of the target if left blank.',
        }),
        defineField({
            name: 'internalLink',
            title: 'Internal Link',
            type: 'reference',
            weak: true,
            to: PAGE_REFERENCES,
            hidden: ({ parent, value }) => !value && parent?.target !== 'Internal',
        }),
        defineField({
            name: 'externalLink',
            title: 'External Link',
            type: 'url',
            validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
            hidden: ({ parent, value }) => !value && parent?.target !== 'External',
        }),
        defineField({
            type: 'array',
            name: 'items',
            title: 'Items',
            description:
                'Set the position and style of your menu items by selecting either Column or Feature',
            of: [
                defineArrayMember({
                    title: 'Column',
                    name: 'column',
                    type: 'object',
                    fields: [
                        {
                            name: 'navigationLabel',
                            title: 'Label',
                            type: 'string',
                        },
                        {
                            name: 'items',
                            title: 'Items',
                            type: 'array',
                            of: [
                                {
                                    type: 'navigation.link',
                                },
                            ],
                        },
                    ],
                }),
                defineArrayMember({
                    title: 'Feature',
                    name: 'feature',
                    type: 'object',
                    fields: [
                        {
                            name: 'navigationLabel',
                            title: 'Label',
                            type: 'string',
                            initialValue: 'Feature',
                        },
                        {
                            name: 'items',
                            title: 'Items',
                            type: 'array',
                            of: [
                                {
                                    type: 'navigation.link',
                                },
                            ],
                        },
                    ],
                }),
                { type: 'navigation.link' },
            ],
            hidden: ({ parent, value }) => !value && parent?.target !== 'Trigger',
        }),
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
});
