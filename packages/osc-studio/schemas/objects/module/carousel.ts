import { StarIcon } from '@sanity/icons';
import pluralize from 'pluralize';
import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'module.carousel',
    title: 'Image Carousel',
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
        defineField({
            title: 'Images',
            name: 'slides',
            type: 'array',
            of: [{ type: 'module.images' }],
            description: 'The images and text within the Carousel',
            group: 'slide',
        }),
        defineField({
            name: 'carouselName',
            title: 'Carousel Name',
            type: 'string',
            description: 'The accessible name of the carousel.',
            group: 'settings',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'settings',
            title: 'Settings',
            type: 'carouselSettings',
            group: 'settings',
        }),
    ],
    preview: {
        select: {
            title: 'carouselName',
            slides: 'slides',
        },
        prepare(selection) {
            const { title } = selection;
            const numberOfSlides = selection.slides.length;

            return {
                title,
                subtitle: `Carousel: (${numberOfSlides} ${pluralize('slide', numberOfSlides)})`,
            };
        },
    },
});
