import type { PortableTextBlock } from '@portabletext/types';

// This lovely piece of code is an export of the content data that is generated by Sanity.
// It's pretty large so I've moved it into this file to keep the test & stories a bit tidier.
// It's only really a dependency of the tests & stories and has no impact on the main Content component.
export const textContent: PortableTextBlock[] = [
    {
        _key: 'b323c62012f7',
        _type: 'block',
        children: [
            {
                _key: 'add1ad894075',
                _type: 'span',
                marks: [],
                text: 'Heading 1'
            }
        ],
        markDefs: [],
        style: 'h1'
    },
    {
        _key: '25e75b5aa5d6',
        _type: 'block',
        children: [
            {
                _key: 'c353d4602892',
                _type: 'span',
                marks: [],
                text: 'Heading 2'
            }
        ],
        markDefs: [],
        style: 'h2'
    },
    {
        _key: '67130c03b412',
        _type: 'block',
        children: [
            {
                _key: '7ab89b8a8f9c',
                _type: 'span',
                marks: [],
                text: 'Heading 3'
            }
        ],
        markDefs: [],
        style: 'h3'
    },
    {
        _key: '67130c03b413',
        _type: 'block',
        children: [
            {
                _key: '7ab89b8a8f9c',
                _type: 'span',
                marks: [],
                text: 'Heading 4'
            }
        ],
        markDefs: [],
        style: 'h4'
    },
    {
        _key: '67130c03b414',
        _type: 'block',
        children: [
            {
                _key: '7ab89b8a8f9c',
                _type: 'span',
                marks: [],
                text: 'Heading 5'
            }
        ],
        markDefs: [],
        style: 'h5'
    },
    {
        _key: '67130c03b415',
        _type: 'block',
        children: [
            {
                _key: '7ab89b8a8f9c',
                _type: 'span',
                marks: [],
                text: 'Heading 6'
            }
        ],
        markDefs: [],
        style: 'h6'
    },
    {
        _key: 'ae0615968daf',
        _type: 'block',
        children: [
            {
                _key: '2a9c73ab09540',
                _type: 'span',
                marks: [],
                text: 'Lorem ipsum dolor sit, amet '
            },
            {
                _key: '69d0f1d5b5ad',
                _type: 'span',
                marks: ['strong'],
                text: 'consectetur'
            },
            {
                _key: '20c1cccfb300',
                _type: 'span',
                marks: [],
                text: ' adipisicing elit. Dicta ipsum quos reiciendis maiores voluptatum nihil. '
            },
            {
                _key: '8a74442ac941',
                _type: 'span',
                marks: ['em'],
                text: 'Rerum'
            },
            {
                _key: '2ff620684880',
                _type: 'span',
                marks: [],
                text: ' nobis ea deserunt, incidunt quod ab non quasi repellat itaque consectetur officia in sunt.'
            }
        ],
        markDefs: [],
        style: 'normal'
    },
    {
        _key: 'e38afdc673fc',
        _type: 'block',
        children: [
            {
                _key: '1e39a513ee7f',
                _type: 'span',
                marks: ['fc7211fe8b77'],
                text: 'Internal link'
            }
        ],
        markDefs: [
            {
                _key: 'fc7211fe8b77',
                _type: 'annotationLinkInternal',
                documentType: 'post',
                reference: {
                    _ref: '74ed3155-eb70-4938-80bc-4e6747537f9c',
                    _type: 'reference',
                    _weak: true
                },
                slug: '/blog/test-post'
            }
        ],
        style: 'normal'
    },
    {
        _key: '70d2a46f7293',
        _type: 'block',
        children: [
            {
                _key: 'bc560eb9d24b',
                _type: 'span',
                marks: ['fb290b94285a'],
                text: 'External link'
            }
        ],
        markDefs: [
            {
                _key: 'fb290b94285a',
                _type: 'annotationLinkExternal',
                newWindow: true,
                url: 'https://example.com'
            }
        ],
        style: 'normal'
    },
    {
        _key: 'ee838d1f79da',
        _type: 'block',
        children: [
            {
                _key: '1c71ad550385',
                _type: 'span',
                marks: ['337c0734cee1'],
                text: 'Email link'
            }
        ],
        markDefs: [
            {
                _key: '337c0734cee1',
                _type: 'annotationLinkEmail',
                email: 'test@example.com'
            }
        ],
        style: 'normal'
    },
    {
        _key: '0eee0c7ce3c5',
        _type: 'block',
        children: [
            {
                _key: '4c09a2e3b4e9',
                _type: 'span',
                marks: [],
                text: ''
            }
        ],
        markDefs: [],
        style: 'normal'
    },
    {
        _key: '578279b652c8',
        _type: 'block',
        children: [
            {
                _key: '9fe2f90fe3b1',
                _type: 'span',
                marks: [],
                text: 'List items'
            }
        ],
        level: 1,
        listItem: 'bullet',
        markDefs: [],
        style: 'normal'
    },
    {
        _key: '88ffa9154b4e',
        _type: 'block',
        children: [
            {
                _key: 'f303edf120dd',
                _type: 'span',
                marks: [],
                text: 'List items'
            }
        ],
        level: 1,
        listItem: 'bullet',
        markDefs: [],
        style: 'normal'
    },
    {
        _key: 'a7a166ee2f52',
        _type: 'block',
        children: [
            {
                _key: '31e23068abf8',
                _type: 'span',
                marks: [],
                text: 'List items'
            }
        ],
        level: 1,
        listItem: 'bullet',
        markDefs: [],
        style: 'normal'
    },
    {
        _key: '80b6f50542c1',
        _type: 'block',
        children: [
            {
                _key: 'b019637320bf',
                _type: 'span',
                marks: [],
                text: 'One'
            }
        ],
        level: 1,
        listItem: 'number',
        markDefs: [],
        style: 'normal'
    },
    {
        _key: '2ee3a1914b62',
        _type: 'block',
        children: [
            {
                _key: '9b59a473b089',
                _type: 'span',
                marks: [],
                text: 'Two'
            }
        ],
        level: 1,
        listItem: 'number',
        markDefs: [],
        style: 'normal'
    },
    {
        _key: '1a65382b6756',
        _type: 'block',
        children: [
            {
                _key: '775ec860f180',
                _type: 'span',
                marks: [],
                text: 'Three'
            }
        ],
        level: 1,
        listItem: 'number',
        markDefs: [],
        style: 'normal'
    }
];
