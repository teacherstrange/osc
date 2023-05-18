import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'carouselSettings',
    title: 'Carousel Settings',
    type: 'object',
    fields: [
        defineField({
            name: 'arrows',
            title: 'Show Arrows',
            type: 'boolean',
            description: 'Whether the Carousel should show arrows to navigate between slides',
            initialValue: false,
        }),
        defineField({
            name: 'dotNav',
            title: 'Show Dot Navigation',
            type: 'boolean',
            description:
                'Whether the Carousel should show dot navigation to navigate between slides',
            initialValue: true,
        }),
        defineField({
            title: 'Loop',
            name: 'loop',
            type: 'boolean',
            initialValue: true,
            description: 'Whether the Carousel should loop when it reaches the last slide',
        }),
        defineField({
            name: 'autoplay',
            title: 'Autoplay',
            type: 'string',
            options: {
                list: ['smooth', 'switch'],
            },
            description: 'Whether the Carousel should autoplay',
            hidden: ({ parent }) => parent?.loop !== true,
        }),
        defineField({
            title: 'Starting slide',
            name: 'startIndex',
            type: 'number',
            initialValue: 1,
            description: 'The slide the Carousel will start at when the page loads',
        }),
        defineField({
            title: 'Slides Per Page',
            name: 'slidesPerView',
            type: 'object',
            options: {
                collapsed: true,
                collapsible: true,
            },
            fields: [
                defineField({
                    name: 'mobile',
                    title: 'Mobile',
                    type: 'number',
                    initialValue: 1.2,
                    description:
                        'The number of slides to show on small screens, smaller than 768px.',
                }),
                defineField({
                    name: 'tablet',
                    title: 'Tablet',
                    type: 'number',
                    initialValue: 2,
                    description: 'The number of slides to show on screens larger than 768px.',
                }),
                defineField({
                    name: 'desktop',
                    title: 'Desktop',
                    type: 'number',
                    initialValue: 3,
                    description: 'The number of slides to show on screens larger than 1440px.',
                }),
            ],
        }),
    ],
});
