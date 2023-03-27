import { IdCardIcon } from '@radix-ui/react-icons';
import pluralize from 'pluralize';
import { defineField, defineType } from 'sanity';

export default defineType({
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
        defineField({
            name: 'slides',
            title: 'Slides',
            type: 'array',
            of: [{ type: 'heroSlide' }],
            group: 'slides',
        }),
        defineField({
            name: 'carouselSettings',
            title: 'Carousel Settings',
            type: 'partialCarouselSettings',
            group: 'settings',
        }),
    ],
    preview: {
        select: {
            slides: 'slides',
        },
        prepare(selection) {
            const title = selection.slides[0].title;
            const numberOfSlides = selection.slides.length;

            return {
                title,
                subtitle: `Hero: (${numberOfSlides} ${pluralize('slide', numberOfSlides)})`,
            };
        },
    },
});
