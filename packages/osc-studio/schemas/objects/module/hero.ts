import { IdCardIcon } from '@radix-ui/react-icons';
import pluralize from 'pluralize';
import { defineField, defineType } from 'sanity';

const shouldShow = (parent: { slides: {}[] }) => {
    return parent?.slides && parent?.slides?.length > 1;
};

export default defineType({
    name: 'module.hero',
    title: 'Hero',
    type: 'object',
    icon: IdCardIcon,
    fields: [
        defineField({
            name: 'slides',
            title: 'Slides',
            type: 'array',
            of: [{ type: 'heroSlide' }],
        }),
        defineField({
            name: 'carouselName',
            title: 'Carousel Name',
            type: 'string',
            description:
                'The accessible name of the Carousel, this will not be visible on the page but is required for accessibility.',
            hidden: ({ parent }) => !shouldShow(parent),
            validation: (Rule) =>
                Rule.custom((currentValue, context) => {
                    const { parent } = context as { parent: { slides: {}[] } };

                    // in a custom validation rule, check if the field should be shown, and if yes, show an error if the value is not set
                    if (shouldShow(parent) && currentValue === undefined) {
                        return 'An accessible name is needed to describe the carousel for screen readers.';
                    }

                    // if we are not showing the field, or if the field has a value then the validation passes
                    return true;
                }),
        }),
        defineField({
            name: 'carouselSettings',
            title: 'Carousel Settings',
            type: 'partialCarouselSettings',
            hidden: ({ parent }) => !shouldShow(parent),
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
