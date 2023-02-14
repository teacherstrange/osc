import { MasterDetailIcon } from '@sanity/icons';
import pluralize from 'pluralize';

const shouldShow = (parent) => {
    return parent.slides.length > 1;
};

export default {
    name: 'module.contentMedia',
    title: 'Content Media',
    type: 'object',
    icon: MasterDetailIcon,
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
            of: [{ type: 'contentMediaSlide' }],
            group: 'slides',
        },
        {
            // To make the name validation only apply when the field is visible we need to move it out of the settings object
            // and put it here. Not ideal from a DRY perspective but improves the UX.
            name: 'carouselName',
            title: 'Carousel Name',
            type: 'string',
            description:
                'The accessible name of the Carousel, this will not be visible on the page but is required for accessibility.',
            hidden: ({ parent }) => !shouldShow(parent),
            validation: (Rule) =>
                Rule.custom((currentValue, { parent }) => {
                    // in a custom validation rule, check if the field should be shown, and if yes, show an error if the value is not set
                    if (shouldShow(parent) && currentValue === undefined) {
                        return 'An accessible name is needed to describe the carousel for screen readers.';
                    }

                    // if we are not showing the field, or if the field has a value then the validation passes
                    return true;
                }),
            group: 'settings',
        },
        {
            name: 'carouselSettings',
            title: 'Carousel Settings',
            type: 'carouselSettings',
            group: 'settings',
            hidden: ({ parent }) => !shouldShow(parent),
        },
    ],
    preview: {
        select: {
            slides: 'slides',
        },
        prepare(selection: Record<string, any>) {
            const title = selection?.slides[0]?.content?.body
                ? selection?.slides[0]?.content?.body[0]?.children[0]?.text
                : 'Untitled'; // display the first item from the body content

            const numberOfSlides = selection.slides.length;

            return {
                title,
                subtitle: `Content Media: (${numberOfSlides} ${pluralize(
                    'slide',
                    numberOfSlides
                )})`,
            };
        },
    },
};
