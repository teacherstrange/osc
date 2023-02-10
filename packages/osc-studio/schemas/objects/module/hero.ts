import { IdCardIcon } from '@radix-ui/react-icons';
import pluralize from 'pluralize';

export default {
    name: 'module.hero',
    title: 'Hero',
    type: 'object',
    icon: IdCardIcon,
    groups: [
        {
            name: 'settings',
            title: 'Settings',
        },
        {
            name: 'slides',
            title: 'Slides',
            default: true,
        },
    ],
    fields: [
        {
            name: 'slides',
            title: 'Slides',
            type: 'array',
            of: [{ type: 'heroSlide' }],
            group: 'slides',
        },
        {
            name: 'carouselSettings',
            title: 'Carousel Settings',
            type: 'carouselSettings',
            group: 'settings',
        },
    ],
    preview: {
        select: {
            slides: 'slides',
        },
        prepare(selection: Record<string, any>) {
            const title = selection.slides[0].title;
            const numberOfSlides = selection.slides.length;

            return {
                title,
                subtitle: `Hero: (${numberOfSlides} ${pluralize('slide', numberOfSlides)})`,
            };
        },
    },
};
