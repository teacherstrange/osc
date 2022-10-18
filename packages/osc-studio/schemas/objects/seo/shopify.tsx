import React from 'react';

export default {
    name: 'seo.shopify',
    title: 'SEO',
    type: 'object',
    description: <></>,
    options: {
        collapsed: false,
        collapsible: true
    },
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'placeholderString',
            description: (
                <>
                    If empty, displays the default Shopify document title (<code>store.title</code>)
                </>
            ),
            options: {
                field: 'store.title'
            },
            validation: (Rule) =>
                Rule.max(50).warning('Longer titles may be truncated by search engines')
        },
        {
            name: 'canonicalUrl',
            title: 'Canonical Url',
            type: 'url',
            description: 'Leave blank to use the default url for this page',
            validation: (Rule) =>
                Rule.uri({
                    scheme: ['http', 'https']
                })
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 2,
            validation: (Rule) =>
                Rule.max(150).warning('Longer descriptions may be truncated by search engines')
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image'
        }
    ]
};
