import { defineType } from 'sanity';

export default defineType({
    name: 'bodyNoHeadings',
    title: 'Body no headings',
    type: 'array',
    of: [
        {
            lists: [
                { title: 'Bullet', value: 'bullet' },
                { title: 'Numbered', value: 'number' },
            ],
            marks: {
                annotations: [
                    // Internal link
                    {
                        name: 'annotationLinkInternal',
                        type: 'annotationLinkInternal',
                    },
                    // URL
                    {
                        name: 'annotationLinkExternal',
                        type: 'annotationLinkExternal',
                    },
                    // Email
                    {
                        name: 'annotationLinkEmail',
                        type: 'annotationLinkEmail',
                    },
                ],
                decorators: [
                    {
                        title: 'Italic',
                        value: 'em',
                    },
                    {
                        title: 'Strong',
                        value: 'strong',
                    },
                ],
            },
            // Regular styles
            styles: [],
            // Paragraphs
            type: 'block',
        },
    ],
});
