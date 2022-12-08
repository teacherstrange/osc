import { StarIcon } from '@sanity/icons';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';

export default {
    name: 'module.carousel',
    title: 'Carousel',
    type: 'object',
    icon: StarIcon,
    groups: [
        {
            default: true,
            name: 'settings',
            title: 'Settings',
        },
        {
            name: 'slide',
            title: 'Slide',
        },
    ],
    fields: [
        {
            title: 'Images',
            name: 'mediaArray',
            type: 'array',
            of: [{ type: 'module.images' }],
            description: 'The images and text within the Carousel',
            group: 'slide',
        },
        {
            name: 'carouselName',
            title: 'Carousel Name',
            type: 'string',
            description:
                'The accessible name of the Carousel, this will not be visible on the page but is required for accessibility.',
            group: 'settings',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'arrows',
            title: 'Show Arrows',
            type: 'boolean',
            description: 'Whether the Carousel should show arrows to navigate between slides',
            initialValue: false,
            group: 'settings',
        },
        {
            name: 'dotNav',
            title: 'Show Dot Navigation',
            type: 'boolean',
            description:
                'Whether the Carousel should show dot navigation to navigate between slides',
            initialValue: true,
            group: 'settings',
        },
        {
            name: 'autoplay',
            title: 'Autoplay',
            type: 'string',
            options: {
                list: ['smooth', 'switch'],
            },
            description:
                'Whether the Carousel should autoplay. Note: That "loop" must be enabled for this to work',
            group: 'settings',
        },
        {
            title: 'Loop',
            name: 'loop',
            type: 'boolean',
            initialValue: true,
            description: 'Whether the Carousel should loop when it reaches the last slide',
            group: 'settings',
        },
        {
            title: 'Starting slide',
            name: 'startIndex',
            type: 'number',
            initialValue: 1,
            description: 'The image the Carousel will start at when the page loads',
            group: 'settings',
        },
        {
            title: 'Slides Per Page',
            name: 'slidesPerView',
            type: 'object',
            description: 'The number of slides to show per page',
            group: 'settings',
            options: {
                collapsed: true,
                collapsible: true,
            },
            fields: [
                {
                    name: 'mobile',
                    title: 'Mobile',
                    type: 'number',
                },
                {
                    name: 'tablet',
                    title: 'Tablet',
                    type: 'number',
                },
                {
                    name: 'desktop',
                    title: 'Desktop',
                    type: 'number',
                },
            ],
        },
    ],
    preview: {
        select: {
            subtitle: 'type',
        },
        prepare(selection: Record<string, any>) {
            return {
                title: 'Carousel',
                subtitle: capitalizeFirstLetter(selection.subtitle),
            };
        },
    },
};
