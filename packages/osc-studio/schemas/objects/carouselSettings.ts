export default {
    name: 'carouselSettings',
    title: 'Carousel Settings',
    type: 'object',
    fields: [
        {
            name: 'carouselName',
            title: 'Carousel Name',
            type: 'string',
            description:
                'The accessible name of the Carousel, this will not be visible on the page but is required for accessibility.',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'arrows',
            title: 'Show Arrows',
            type: 'boolean',
            description: 'Whether the Carousel should show arrows to navigate between slides',
            initialValue: false,
        },
        {
            name: 'dotNav',
            title: 'Show Dot Navigation',
            type: 'boolean',
            description:
                'Whether the Carousel should show dot navigation to navigate between slides',
            initialValue: true,
        },
        {
            title: 'Loop',
            name: 'loop',
            type: 'boolean',
            initialValue: true,
            description: 'Whether the Carousel should loop when it reaches the last slide',
        },
        {
            name: 'autoplay',
            title: 'Autoplay',
            type: 'string',
            options: {
                list: ['smooth', 'switch'],
            },
            description: 'Whether the Carousel should autoplay',
            hidden: ({ parent }) => parent.loop !== true,
        },
        {
            title: 'Starting slide',
            name: 'startIndex',
            type: 'number',
            initialValue: 1,
            description: 'The slide the Carousel will start at when the page loads',
        },
        {
            title: 'Slides Per Page',
            name: 'slidesPerView',
            type: 'object',
            options: {
                collapsed: true,
                collapsible: true,
            },
            fields: [
                {
                    name: 'mobile',
                    title: 'Mobile',
                    type: 'number',
                    initialValue: 1,
                    description:
                        'The number of slides to show on small screens, smaller than 768px.',
                },
                {
                    name: 'tablet',
                    title: 'Tablet',
                    type: 'number',
                    initialValue: 1,
                    description: 'The number of slides to show on screens larger than 768px.',
                },
                {
                    name: 'desktop',
                    title: 'Desktop',
                    type: 'number',
                    initialValue: 1,
                    description: 'The number of slides to show on screens larger than 1440px.',
                },
            ],
        },
    ],
};
