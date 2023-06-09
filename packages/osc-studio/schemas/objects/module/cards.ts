import { ThLargeIcon } from '@sanity/icons';
import pluralize from 'pluralize';
import { defineField, defineType } from 'sanity';

const CARDS = [
    { type: 'card.bio' },
    { type: 'card.course' },
    { type: 'card.collection' },
    { type: 'card.post' },
    { type: 'card.static' },
];

const shouldShow = (parent: { layout: string }) => {
    return parent.layout === 'carousel';
};

export default defineType({
    name: 'module.cards',
    title: 'Cards',
    type: 'object',
    icon: ThLargeIcon,
    groups: [
        {
            name: 'row',
            title: 'Row',
        },
        {
            name: 'content',
            title: 'Content',
            default: true,
        },
        {
            name: 'cards',
            title: 'Cards',
        },
    ],
    fields: [
        defineField({
            name: 'rowSettings',
            title: 'Settings',
            type: 'rowSettings',
            group: 'row',
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'module.content',
            group: 'content',
        }),
        defineField({
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
        }),
        defineField({
            name: 'carouselName',
            title: 'Carousel Name',
            type: 'string',
            description: 'The accessible name of the carousel.',
            group: 'cards',
            hidden: ({ parent }) => !shouldShow(parent),
            validation: (Rule) =>
                Rule.custom((currentValue, context) => {
                    const { parent } = context as { parent: { layout: string } };

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
            type: 'carouselSettings',
            group: 'cards',
            hidden: ({ parent }) => !shouldShow(parent),
        }),
        defineField({
            name: 'card',
            title: 'Card',
            type: 'array',
            of: CARDS,
            group: 'cards',
            validation: (Rule) =>
                Rule.custom((currentValue, context) => {
                    const { parent } = context as { parent: { layout: string } };
                    // in a custom validation rule, check if the field should be shown, and if yes, show an error if the value is not set
                    if (!currentValue || currentValue.length === 0) {
                        return 'You must add at least one card.';
                    }

                    if (parent.layout === 'island grid' && currentValue.length > 3) {
                        return 'You can only add up to 3 cards when Island grid layout is set.';
                    }

                    return true;
                }),
        }),
    ],
    preview: {
        select: {
            cardCount: 'card.length',
        },
        prepare(selection) {
            const { cardCount } = selection;

            return {
                title: 'Cards',
                subtitle: cardCount ? pluralize('item', cardCount, true) : 'No items',
            };
        },
    },
});
