import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'partialCarouselSettings',
    title: 'Carousel Settings',
    type: 'object',
    fields: [
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
            hidden: ({ parent }) => parent.loop !== true,
        }),
        defineField({
            title: 'Starting slide',
            name: 'startIndex',
            type: 'number',
            initialValue: 1,
            description: 'The slide the Carousel will start at when the page loads',
        }),
    ],
});
