import { ThLargeIcon } from '@sanity/icons';
import pluralize from 'pluralize';
import { ColorPicker } from '../../../components/inputs/ColorPicker';
import { SPACING } from '../../../constants';

const CARDS = [
    { type: 'card.bio' },
    { type: 'card.course' },
    { type: 'card.collection' },
    { type: 'card.post' },
    { type: 'card.static' },
];

const shouldShow = (parent) => {
    return parent.layout === 'carousel';
};

export default {
    name: 'module.cards',
    title: 'Cards',
    type: 'object',
    icon: ThLargeIcon,
    groups: [
        {
            default: true,
            name: 'spacing',
            title: 'Spacing',
        },
        {
            name: 'content',
            title: 'Content',
        },
        {
            name: 'cards',
            title: 'Cards',
        },
    ],
    fields: [
        {
            name: 'content',
            title: 'Content',
            type: 'module.content',
            group: 'content',
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
            name: 'layout',
            title: 'Layout',
            type: 'string',
            description: 'Select the layout for the cards.',
            initialValue: 'grid',
            options: {
                list: ['grid', 'island grid', 'carousel'],
                layout: 'dropdown',
            },
            validation: (Rule) => Rule.required(),
            group: 'cards',
        },
        {
            name: 'carouselName',
            title: 'Carousel Name',
            type: 'string',
            description: 'The accessible name of the carousel.',
            group: 'cards',
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
            type: 'carouselSettings',
            group: 'cards',
            hidden: ({ parent }) => !shouldShow(parent),
        },
        {
            name: 'backgroundColor',
            title: 'Background Colour',
            type: 'string',
            inputComponent: ColorPicker,
            group: 'cards',
        },
        {
            name: 'card',
            title: 'Card',
            type: 'array',
            of: CARDS,
            group: 'cards',
            validation: (Rule) =>
                Rule.custom((currentValue, { parent }) => {
                    // in a custom validation rule, check if the field should be shown, and if yes, show an error if the value is not set
                    if (!currentValue || currentValue.length === 0) {
                        return 'You must add at least one card.';
                    }

                    if (parent.layout === 'island grid' && currentValue.length > 3) {
                        return 'You can only add up to 3 cards when Island grid layout is set.';
                    }

                    return true;
                }),
        },
    ],
    preview: {
        select: {
            cardCount: 'card.length',
        },
        prepare(selection: Record<string, any>) {
            const { cardCount } = selection;

            return {
                title: 'Cards',
                subtitle: cardCount ? pluralize('item', cardCount, true) : 'No items',
            };
        },
    },
};
