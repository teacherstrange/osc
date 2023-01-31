import { ThLargeIcon } from '@sanity/icons';
import pluralize from 'pluralize';
import { ColorPicker } from '../../../components/inputs/ColorPicker';

const CARDS = [
    { type: 'card.bio' },
    { type: 'card.course' },
    { type: 'card.collection' },
    { type: 'card.post' },
    { type: 'card.static' },
];

export default {
    name: 'module.cards',
    title: 'Cards',
    type: 'object',
    icon: ThLargeIcon,
    fields: [
        {
            name: 'layout',
            title: 'Layout',
            type: 'string',
            description: 'Select the layout for the cards.',
            initialValue: 'grid',
            options: {
                list: ['grid', 'carousel'],
                layout: 'dropdown',
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'backgroundColor',
            title: 'Background Colour',
            type: 'string',
            inputComponent: ColorPicker,
        },
        {
            name: 'card',
            title: 'Card',
            type: 'array',
            of: CARDS,
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
