export default {
    name: 'seo.home',
    title: 'SEO',
    type: 'object',
    options: {
        collapsed: false,
        collapsible: true
    },
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
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
        },
        {
            name: 'robots',
            title: 'Search engine visibility',
            type: 'object',
            description: 'It is up to search engines to honor this request.',
            options: {
                collapsed: false,
                collapsible: true
            },
            fields: [
                {
                    name: 'noIndex',
                    title: 'Discourage search engines from indexing this page',
                    type: 'boolean'
                }
            ]
        }
    ],
    validation: (Rule) => Rule.required()
};
