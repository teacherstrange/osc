import { IdCardIcon } from '@radix-ui/react-icons';

const shouldShow = (parent) => {
    return parent?.mediaType && parent?.mediaType?.length > 1;
};

export default {
    name: 'contentMediaSlide',
    title: 'Content Media',
    type: 'object',
    icon: IdCardIcon,
    groups: [
        {
            name: 'settings',
            title: 'Settings',
        },
        {
            name: 'content',
            title: 'Content',
            default: true,
        },
        {
            name: 'media',
            title: 'Media',
        },
    ],
    fields: [
        {
            name: 'layoutDirection',
            title: 'Layout Direction',
            type: 'string',
            initialValue: 'content-media',
            options: {
                list: [
                    { title: 'Content | Media', value: 'content-media' },
                    { title: 'Media | Content', value: 'media-content' },
                ],
                layout: 'radio',
                direction: 'horizontal',
            },
            group: 'settings',
        },
        {
            name: 'contentAlignment',
            title: 'Vertical Content Alignment',
            type: 'string',
            initialValue: 'center',
            options: {
                list: [
                    { title: 'Top', value: 'start' },
                    { title: 'Center', value: 'center' },
                    { title: 'Bottom', value: 'end' },
                ],
                layout: 'radio',
                direction: 'horizontal',
            },
            group: 'settings',
        },
        {
            name: 'layoutGrid',
            title: 'Layout Grid',
            type: 'string',
            initialValue: '50/50',
            options: {
                list: ['50/50', '60/40', '40/60'],
                layout: 'radio',
                direction: 'horizontal',
            },
            group: 'settings',
        },
        {
            name: 'content',
            title: 'Content',
            type: 'module.content',
            group: 'content',
        },
        {
            name: 'media',
            title: 'Media',
            type: 'object',
            group: 'media',
            fields: [
                {
                    name: 'mediaType',
                    title: 'Media Type',
                    type: 'array',
                    of: [{ type: 'contentMediaImage' }],
                    validation: (Rule) => Rule.required(),
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
                },
                {
                    name: 'carouselSettings',
                    title: 'Carousel Settings',
                    type: 'partialCarouselSettings',
                    hidden: ({ parent }) => !shouldShow(parent),
                },
            ],
        },
    ],
};
