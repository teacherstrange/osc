import { StarIcon } from '@sanity/icons';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';

export default {
    name: 'module.carousel',
    title: 'Carousel',
    type: 'object',
    icon: StarIcon,
    groups: [
        {
            name: 'settings',
            title: 'Settings',
        },
        {
            name: 'slide',
            title: 'Slide',
            default: true,
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
            name: 'settings',
            title: 'Settings',
            type: 'carouselSettings',
            group: 'settings',
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
