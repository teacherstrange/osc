export default {
    name: 'body',
    title: 'Body',
    type: 'array',
    of: [
        {
            lists: [
                { title: 'Bullet', value: 'bullet' },
                { title: 'Numbered', value: 'number' }
            ],
            marks: {
                annotations: [
                    // Internal link
                    {
                        name: 'annotationLinkInternal',
                        type: 'annotationLinkInternal'
                    },
                    // URL
                    {
                        name: 'annotationLinkExternal',
                        type: 'annotationLinkExternal'
                    },
                    // Email
                    {
                        name: 'annotationLinkEmail',
                        type: 'annotationLinkEmail'
                    }
                ],
                decorators: [
                    {
                        title: 'Italic',
                        value: 'em'
                    },
                    {
                        title: 'Strong',
                        value: 'strong'
                    }
                ]
            },
            // Regular styles
            styles: [
                {
                    title: 'Heading 1',
                    value: 'h1'
                },
                {
                    title: 'Heading 2',
                    value: 'h2'
                },
                {
                    title: 'Heading 3',
                    value: 'h3'
                },
                {
                    title: 'Heading 4',
                    value: 'h4'
                },
                {
                    title: 'Heading 5',
                    value: 'h5'
                },
                {
                    title: 'Heading 6',
                    value: 'h6'
                }
            ],
            // Paragraphs
            type: 'block'
        }
    ]
};
