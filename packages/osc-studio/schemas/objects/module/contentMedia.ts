import { MasterDetailIcon } from '@sanity/icons';
import pluralize from 'pluralize';
import { SPACING } from '../../../constants';

const shouldShow = (parent) => {
    return parent?.slides?.length > 1;
};

export default {
    name: 'module.contentMedia',
    title: 'Content Media',
    type: 'object',
    icon: MasterDetailIcon,
    groups: [
        {
            name: 'spacing',
            title: 'Spacing',
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
            name: 'marginBottom',
            title: 'Push Region',
            type: 'string',
            description: 'Spacing you would like between this region and the next.',
            options: {
                list: SPACING,
                layout: 'dropdown',
            },
            group: 'spacing',
        },
        {
            name: 'paddingTop',
            title: 'Inner Padding Top',
            type: 'string',
            description: 'Inner padding at the top of the region.',
            options: {
                list: SPACING,
                layout: 'dropdown',
            },
            group: 'spacing',
        },
        {
            name: 'paddingBottom',
            title: 'Inner Padding Bottom',
            type: 'string',
            description: 'Inner padding at the bottom of the region.',
            options: {
                list: SPACING,
                layout: 'dropdown',
            },
            group: 'spacing',
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
            group: 'slides',
        },
        {
            name: 'carouselSettings',
            title: 'Carousel Settings',
            type: 'partialCarouselSettings',
            group: 'slides',
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
