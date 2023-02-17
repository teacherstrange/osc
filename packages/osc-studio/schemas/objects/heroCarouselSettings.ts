export default {
    name: 'heroCarouselSettings',
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
    ],
};
