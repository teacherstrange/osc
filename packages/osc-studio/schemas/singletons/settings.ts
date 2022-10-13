import { CogIcon, PackageIcon } from '@sanity/icons';

const TITLE = 'Settings';

export default {
    name: 'settings',
    title: TITLE,
    type: 'document',
    icon: CogIcon,
    groups: [
        {
            default: true,
            name: 'navigation',
            title: 'Navigation'
        },
        {
            name: 'productOptions',
            title: 'Product options'
        },
        {
            name: 'notFoundPage',
            title: '404 page'
        },
        {
            name: 'seo',
            title: 'SEO'
        }
    ],
    fields: [
        // Menu
        {
            name: 'menu',
            title: 'Menu',
            type: 'object',
            group: 'navigation',
            options: {
                collapsed: false,
                collapsible: true
            },
            fields: [
                // Links
                {
                    name: 'links',
                    title: 'Links',
                    type: 'array',
                    of: [
                        {
                            name: 'collectionGroup',
                            title: 'Collection group',
                            type: 'object',
                            icon: PackageIcon,
                            fields: [
                                {
                                    name: 'title',
                                    title: 'Title',
                                    type: 'string',
                                    validation: (Rule) => Rule.required()
                                },
                                {
                                    name: 'collectionLinks',
                                    title: 'Collection links',
                                    type: 'array',
                                    validation: (Rule) => Rule.unique().max(4),
                                    of: [
                                        {
                                            name: 'collection',
                                            type: 'reference',
                                            weak: true,
                                            to: [{ type: 'collection' }]
                                        }
                                    ]
                                },
                                {
                                    name: 'collectionProducts',
                                    title: 'Collection products',
                                    type: 'reference',
                                    description: 'Products from this collection will be listed',
                                    weak: true,
                                    to: [{ type: 'collection' }]
                                }
                            ]
                        },
                        { type: 'linkInternal' },
                        { type: 'linkExternal' }
                    ]
                }
            ]
        },
        // Footer
        {
            name: 'footer',
            title: 'Footer',
            type: 'object',
            group: 'navigation',
            options: {
                collapsed: false,
                collapsible: true
            },
            fields: [
                // Links
                {
                    name: 'links',
                    title: 'Links',
                    type: 'array',
                    of: [{ type: 'linkInternal' }, { type: 'linkExternal' }]
                },
                // Text
                {
                    name: 'text',
                    title: 'Text',
                    type: 'array',
                    of: [
                        {
                            lists: [],
                            marks: {
                                annotations: [
                                    // Email
                                    {
                                        title: 'Email',
                                        name: 'annotationLinkEmail',
                                        type: 'annotationLinkEmail'
                                    },
                                    // Internal link
                                    {
                                        title: 'Internal page',
                                        name: 'annotationLinkInternal',
                                        type: 'annotationLinkInternal'
                                    },
                                    // URL
                                    {
                                        title: 'URL',
                                        name: 'annotationLinkExternal',
                                        type: 'annotationLinkExternal'
                                    }
                                ],
                                decorators: []
                            },
                            // Block styles
                            styles: [{ title: 'Normal', value: 'normal' }],
                            type: 'block'
                        }
                    ]
                }
            ]
        },
        // Not found page
        {
            name: 'notFoundPage',
            title: '404 page',
            type: 'object',
            group: 'notFoundPage',
            fields: [
                {
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                    validation: (Rule) => Rule.required()
                },
                {
                    name: 'body',
                    title: 'Body',
                    type: 'text',
                    rows: 2
                },
                {
                    name: 'collection',
                    title: 'Collection',
                    type: 'reference',
                    description: 'Collection products displayed on this page',
                    weak: true,
                    to: [
                        {
                            name: 'collection',
                            type: 'collection'
                        }
                    ]
                }
            ]
        },
        // SEO
        {
            name: 'seo',
            title: 'SEO',
            type: 'object',
            group: 'seo',
            description: 'Defaults for every page',
            options: {
                collapsed: false,
                collapsible: true
            },
            fields: [
                {
                    name: 'title',
                    title: 'Site title',
                    type: 'string',
                    validation: (Rule) => Rule.required()
                },
                {
                    name: 'description',
                    title: 'Description',
                    type: 'text',
                    rows: 2,
                    validation: (Rule) =>
                        Rule.max(150).warning(
                            'Longer descriptions may be truncated by search engines'
                        )
                }
            ],
            validation: (Rule) => Rule.required()
        }
    ],
    preview: {
        prepare() {
            return {
                title: TITLE
            };
        }
    }
};
