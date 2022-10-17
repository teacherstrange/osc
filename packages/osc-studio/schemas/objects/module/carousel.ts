import { StarIcon } from '@sanity/icons';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';

// TODO: ak - to add fields in when creating modules, modules are shown on pages, they are spit out in order
export default {
    name: 'module.carousel',
    title: 'Carousel',
    type: 'object',
    icon: StarIcon,
    fields: [
        { title: 'Active', name: 'active', type: 'boolean' },
        { title: 'Height', name: 'height', type: 'number' },
        { title: 'Align', name: 'align', type: 'string' },
        { title: 'Starting slide', name: 'startIndex', type: 'number' },
        {
            title: 'Media Array',
            name: 'mediaArray',
            type: 'array',
            of: [{ type: 'module.image' }]
        },
        { title: 'Delay', name: 'delay', type: 'number' },
        { title: 'Slides Per Page', name: 'slidesPerPage', type: 'number' },
        { title: 'Slides To Scroll', name: 'slidesToScroll', type: 'boolean' },
        { title: 'Slide Gap', name: 'slideGap', type: 'number' },
        { title: 'Axis', name: 'axis', type: 'string' },
        { title: 'Loop', name: 'loop', type: 'boolean' }
    ],
    preview: {
        select: {
            subtitle: 'type'
        },
        prepare(selection: Record<string, any>) {
            return {
                title: 'Carousel',
                subtitle: capitalizeFirstLetter(selection.subtitle)
            };
        }
    }
};
